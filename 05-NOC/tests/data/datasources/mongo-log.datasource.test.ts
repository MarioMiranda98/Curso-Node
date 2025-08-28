import { MongoDatabse } from '../../../src/data/mongo/init';
import { envs } from '../../../src/config/plugins/env.plugin';
import mongoose from 'mongoose';
import { MongoLogDatasourceImpl } from '../../../src/data/datasources/mongo-log.datasource.impl';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogModel } from '../../../src/data/mongo';
describe('mongo-log.datasource.test.ts', () => {
  beforeAll(async () => {
    await MongoDatabse.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  const logDatasource = new MongoLogDatasourceImpl();

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts'
  });

  test('should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log');

    await logDatasource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
  });

  test('should get logs', async () => {
    await logDatasource.saveLog(log);

    const logs = await logDatasource.getLogs(LogSeverityLevel.medium);

    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogSeverityLevel.medium);
  });
});