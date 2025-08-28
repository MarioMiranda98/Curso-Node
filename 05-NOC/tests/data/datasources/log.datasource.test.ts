import { LogDatasource } from '../../../src/domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';

describe('log.datasource.test.ts', () => {
  const newLog: LogEntity = {
    origin: 'log.datasource.test.ts',
    message: 'Test log message',
    level: LogSeverityLevel.low,
    createdAt: new Date(),
  };

  class MockLogDataSource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }

  }

  test('should test the abstract class', () => {
    const mockLogDataSource = new MockLogDataSource();

    expect(mockLogDataSource).toBeDefined();
    expect(mockLogDataSource).toHaveProperty('saveLog');
    expect(mockLogDataSource).toHaveProperty('getLogs');
    expect(typeof mockLogDataSource.saveLog).toBe('function');
    expect(typeof mockLogDataSource.getLogs).toBe('function');
    expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
  });
})
