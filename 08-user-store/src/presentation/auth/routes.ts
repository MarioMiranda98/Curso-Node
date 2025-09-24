import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth/auth.service";
import { EmailService } from '../services/email/email.service';
import { envs } from "../../config";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY
    );

    const authService = new AuthService(emailService);
    const controller = new AuthController(authService);

    router.post('/login', controller.loginUser.bind(controller));
    router.post('/register', controller.registerUser);
    router.post('/validate-email/:token', controller.validateEmail.bind(controller));

    return router;
  }
}