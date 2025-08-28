import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from '../../../src/presentation/email/email.service';

describe('email.service.test.ts', () => {
  const mockSendMail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should send an email', async () => {
    const emailService = new EmailService(null as any);

    const options: SendMailOptions = {
      to: 'farolin95@msn.com',
      subject: 'Test email',
      htmlBody: '<h1>Test email body</h1>',
      attachments: [],
    }

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
      ...options,
      attachments: expect.any(Array),
    }));
  });

  test('Should send email with attachments', async () => {
    const emailService = new EmailService(null as any);

    await emailService.sendEmailWithFileSystemLogs('farolin95@msn.com');


    expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: 'farolin95@msn.com',
      subject: 'Logs del servidor',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: 'logs-low.log', path: './logs/logs-low.log' }
      ]),
    }));
  });
});