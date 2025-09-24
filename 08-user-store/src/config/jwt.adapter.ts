import { sign, verify, decode } from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {
  public static create(payload: { [key: string]: any }) {
    const token = sign({
      data: { ...payload }
    }, envs.JWT_SECRET, { expiresIn: '1h' });

    return token;
  }

  public static validate(token: string): boolean {
    try {
      verify(token, envs.JWT_SECRET);

      return true;
    } catch (_) {
      return false;
    }
  }

  public static decode(token: string) {
    return decode(token);
  }
}