import { LogRepository } from "../domain/repositories/log.repository";
import { CronService } from "./cron/cron-service";
import { FileSystemRepositoryImpl } from '../data/repositories/file-system.repository.impl';
import { FileSystemDatasource } from "../data/datasources/file-system.datasource.impl";
import { EmailService } from "./email/email.service";
import { MongoLogDatasourceImpl } from "../data/datasources/mongo-log.datasource.impl";
import { CheckServiceMultiple } from "../domain/usecases/checks/checks-service-multiple";
import { PostgresLogDatasourceImpl } from '../data/datasources/postgres-log.datasource.impl';

const postgresLogDatasource: LogRepository = new FileSystemRepositoryImpl(new PostgresLogDatasourceImpl());
const fileSystemLogRepository: LogRepository = new FileSystemRepositoryImpl(new FileSystemDatasource());
const logRepository: LogRepository = new FileSystemRepositoryImpl(new MongoLogDatasourceImpl());

export class Server {
  public static start() {
    console.log('Server started...');
    const emailService = new EmailService(logRepository);

    emailService.sendEmail({
      to: 'farolin95@msn.com',
      subject: 'Logs del sistema NOC',
      htmlBody: `
      <h3>Logs del sistema noc</h3>
      <p>Occaecat eiusmod consectetur minim cillum esse est mollit qui qui qui consectetur.</p>
      `,
    });

    emailService.sendEmailWithFileSystemLogs('farolin95@msn.com');

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';

      new CheckServiceMultiple(
        [logRepository, fileSystemLogRepository, postgresLogDatasource],
        () => console.log(`${url} is ok`),
        (error) => console.error(error),
      ).execute(url)
    });
  }
}