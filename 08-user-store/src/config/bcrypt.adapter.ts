import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class BCryptAdapter {
  public static hash(password: string) {
    const salt = genSaltSync();

    return hashSync(password, salt);
  }

  public static compare(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }
}