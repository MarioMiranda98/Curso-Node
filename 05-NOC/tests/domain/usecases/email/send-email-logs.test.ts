import { SendEmailLogs } from '../../../../src/domain/usecases/email/send-email-logs';
import { EmailService } from '../../../../src/presentation/email/email.service';
import { LogEntity } from '../../../../src/domain/entities/log.entity';

describe('SendEmailLogs.test.ts', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  test('should call sendEmail and saveLog', async () => {
    const mockEmailService = {
      sendEmail: jest.fn().mockResolvedValue(true),
    };
    const mockLogService = {
      saveLog: jest.fn().mockResolvedValue(true), // Mock implementation
      getLogs: jest.fn().mockResolvedValue([]), // Mock implementation
    };

    const sendEmailLogs = new SendEmailLogs(mockEmailService as unknown as EmailService, mockLogService);

    const result = await sendEmailLogs.execute('farolin95@msn.com');

    expect(result).toBe(true);
    expect(mockEmailService.sendEmail).toHaveBeenCalledTimes(1);
    expect(mockLogService.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test('should log in case of error', async () => {
    const mockEmailService = {
      sendEmail: jest.fn().mockResolvedValue(false),
    };

    const mockLogService = {
      saveLog: jest.fn().mockResolvedValue(false), // Mock implementation
      getLogs: jest.fn().mockResolvedValue([]), // Mock implementation
    };

    const sendEmailLogs = new SendEmailLogs(mockEmailService as unknown as EmailService, mockLogService);

    const result = await sendEmailLogs.execute('farolin95@msn.com');
  });
});