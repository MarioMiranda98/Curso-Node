import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';
import { LogRepository } from '../../domain/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface Attachment {
  filename: string;
  path: string;
}

export interface SendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  attachments?: Attachment[],
}


export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });

  constructor(
    private readonly logRepository: LogRepository,
  ) { }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments
      });

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email sent',
        origin: 'email.service.ts'
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string): Promise<boolean> {
    try {
      const subject = 'Logs del servidor';

      const htmlBody = `
      <h3>Logs del sistema noc</h3>
      <p>Occaecat eiusmod consectetur minim cillum esse est mollit qui qui qui consectetur.</p>
      `;

      const attachments: Attachment[] = [
        { filename: 'logs-low.log', path: './logs/logs-low.log' }
      ];

      this.sendEmail({
        to: to,
        subject: subject,
        attachments: attachments,
        htmlBody: htmlBody
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}