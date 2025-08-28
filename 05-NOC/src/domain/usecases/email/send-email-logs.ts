import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

interface SendLogEmailUsecase {
  execute: (to: string) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUsecase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) { }

  async execute(to: string) {
    try {
      return await this.emailService.sendEmailWithFileSystemLogs(to);
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        origin: 'send-email-logs.ts',
      });

      this.logRepository.saveLog(log);

      return false;
    }
  }
}