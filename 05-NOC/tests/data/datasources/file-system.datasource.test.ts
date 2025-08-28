import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from '../../../src/data/datasources/file-system.datasource.impl';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';

describe('file-system.datasource.test.ts', () => {
  const logPath = path.join(__dirname, '../../../logs');

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test('should create log files if they do not exists', () => {
    expect(fs.existsSync(logPath)).toBe(false);

    new FileSystemDatasource();

    expect(fs.existsSync(logPath)).toBe(true);
  });

  test('should save a log in logs-all.log', async () => {
    const datasource = new FileSystemDatasource();

    const log: LogEntity = {
      message: 'Test log',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    };

    await datasource.saveLog(log);
    const allLogs = fs.readFileSync(path.join(logPath, 'logs-all.log'), 'utf-8');

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test('should save a log in logs-all.log and medium', async () => {
    const datasource = new FileSystemDatasource();

    const log: LogEntity = {
      message: 'Test log',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    };

    await datasource.saveLog(log);
    const allLogs = fs.readFileSync(path.join(logPath, 'logs-all.log'), 'utf-8');
    const mediumLogs = fs.readFileSync(path.join(logPath, 'logs-medium.log'), 'utf-8');

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test('should save a log in logs-all.log and high', async () => {
    const datasource = new FileSystemDatasource();

    const log: LogEntity = {
      message: 'Test log',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    };

    await datasource.saveLog(log);
    const allLogs = fs.readFileSync(path.join(logPath, 'logs-all.log'), 'utf-8');
    const highLogs = fs.readFileSync(path.join(logPath, 'logs-medium.log'), 'utf-8');

    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test('should return all logs', async () => {
    const logDatasource = new FileSystemDatasource();

    const logLow = new LogEntity({
      message: 'Test log low',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    });

    const logMedium = new LogEntity({
      message: 'Test log medium',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    });

    const logHigh = new LogEntity({
      message: 'Test log high',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    });

    await logDatasource.saveLog(logLow);
    await logDatasource.saveLog(logMedium);
    await logDatasource.saveLog(logHigh);

    const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
  });

  test('should not throw an error if path exists', async () => {
    new FileSystemDatasource();
    new FileSystemDatasource();

    expect(true).toBeTruthy();
  });

  test('should throw an error if severity level is not defined', async () => {
    const logDatasource = new FileSystemDatasource();
    const customSeverityLevel = "SUPER_MEGA_HIGH" as LogSeverityLevel;

    const log = new LogEntity({
      message: 'Test log medium',
      level: customSeverityLevel,
      origin: 'file-system.datasource.test.ts',
      createdAt: new Date(),
    });

    try {
      await logDatasource.saveLog(log);
      expect(true).toBeFalsy();
    } catch (error) {
      const errorString = `${error}`;

      expect(errorString).toContain(`Severity ${customSeverityLevel} not defined`);
    }
  });
});