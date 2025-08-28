import { envs } from '../../src/config/plugins/env.plugin';

describe("Envs plugin", () => {
  test('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_EMAIL: 'marioufc1990@gmail.com',
      MAILER_SECRET_KEY: 'wpfiqpnwfznvpdmi',
      PROD: false,
      MAILER_SERVICE: 'gmail',
      MONGO_URL: 'mongodb://mario:123456789@localhost:27018',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'mario',
      MONGO_PASS: '123456789',
      POSTGRES_USER: 'postgres',
      POSTGRES_DB: 'NOC-TEST',
      POSTGRES_PASSWORD: '123456789',
      POSTGRES_PORT: 5433,
      POSTGRES_HOST: 'localhost',
      POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5433'
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./../../src/config/plugins/env.plugin');
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer')
    }
  });
});