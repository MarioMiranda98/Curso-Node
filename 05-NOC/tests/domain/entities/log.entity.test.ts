import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';

describe('log.entity.test.ts', () => {
  const dataObj = {
    message: 'Test log message',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts',
  };


  test('should create a LogEntity instance', () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a LogEntity instace from json', () => {
    const json = `{"message": "Service https://google.com working", "level": "low", "origin": "log.entity.test.ts", "createdAt": "2025-10-10T10:00:00.000Z"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('Service https://google.com working');
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe('log.entity.test.ts');
    expect(log.createdAt.toISOString()).toBe('2025-10-10T10:00:00.000Z');
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a LogEntity instace from object', () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
})
