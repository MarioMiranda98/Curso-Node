import { FileSystemDatasource } from '../../../src/data/datasources/file-system.datasource.impl';
import { FileSystemRepositoryImpl } from '../../../src/data/repositories/file-system.repository.impl';
import { LogSeverityLevel } from '../../../src/domain/entities/log.entity';

describe('log.repository.test.ts', () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const logRepository = new FileSystemRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('saveLog should call the datasource', async () => {
    const log = {
      message: 'Test log',
      level: LogSeverityLevel.low,
      origin: 'log.repository.test.ts',
      createdAt: new Date(),
    };

    await logRepository.saveLog(log);

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test('getLogs should call the datasource with arguments', async () => {

    await logRepository.getLogs(LogSeverityLevel.medium);

    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.medium);
  });
});