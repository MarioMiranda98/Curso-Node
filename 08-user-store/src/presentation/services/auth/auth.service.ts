import { JwtPayload } from "jsonwebtoken";
import { BCryptAdapter, envs } from "../../../config";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { UserModel } from "../../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../../domain";
import { LoginUserDto } from '../../../domain/dtos/auth/login-user.dto';
import { EmailService } from "../email/email.service";

export class AuthService {
  constructor(
    private readonly emailService: EmailService
  ) { }

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already exists');

    try {
      const user = new UserModel(registerUserDto);

      user.password = BCryptAdapter.hash(registerUserDto.password);
      await user.save();

      await this.sendEmailValidationLink(user.email);

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { ...userEntity, token: 'ABC' };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const existUser = await UserModel.findOne({ email: loginUserDto.email });

    if (!existUser) throw CustomError.badRequest('User does not exist');

    const password = loginUserDto.password;
    const doPasswordsMatch = BCryptAdapter.compare(password, existUser.password);

    if (doPasswordsMatch) {
      const { password, ...userEntity } = UserEntity.fromObject(existUser);

      const token = JwtAdapter.create(userEntity);

      return { ...userEntity, token: token };
    } else {
      throw CustomError.unauthorized('Credentials are wrong');
    }
  }

  public async validateEmail(token: string) {
    const isValidToken = JwtAdapter.validate(token);

    if (!isValidToken) throw CustomError.unauthorized('Token is invalid');

    const data = JwtAdapter.decode(token) as JwtPayload;

    if (!data) throw CustomError.internalServer('Token decoded error');

    const email = data['data'].email;

    const user = await UserModel.findOne({
      email: email
    });

    if (!user) CustomError.notFound('User does not exist');

    user!.emailValidated = true;
    await user!.save();

    return true;
  };

  private sendEmailValidationLink = async (email: string) => {
    const token = JwtAdapter.create({ email });

    if (!token) throw CustomError.internalServer('Error creating token');

    const link = `${envs.WEB_SERVICE_URL}/auth/validate-email/${token}`;

    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href=${link}>Validate your email</a>
    `;

    const hasSent = this.emailService.sendEmail({
      to: email,
      htmlBody: html,
      subject: 'Validate your email',
    });

    if (!hasSent) throw CustomError.internalServer('Error while sending email');

    return true;
  };
}