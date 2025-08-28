import { emailTemplate } from '../../../src/js-foundation/01-template';

describe("Test at 01 Template", () => {
  test('emailTemplate should contain a greeting', () => {
    expect(emailTemplate).toContain('Hi, ')
  });

  test('emailTemplate should contain {{name}} and {{orderId}}', () => {
    expect(emailTemplate).toContain('{{name}}');
    expect(emailTemplate).toContain('{{orderId}}');

    expect(emailTemplate).toMatch(/{{name}}/);
    expect(emailTemplate).toMatch(/{{orderId}}/);
  });
});