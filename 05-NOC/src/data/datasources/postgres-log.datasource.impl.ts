import { AppDataSource } from "../../config/typeorm/data-source";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogPostgresModel } from "../postgres/postgres.schema";

export class PostgresLogDatasourceImpl extends LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    await AppDataSource.createQueryBuilder().insert().into(LogPostgresModel).values([
      { ...log }
    ]).execute();
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await AppDataSource.getRepository(LogPostgresModel).createQueryBuilder("log").where("log.level = :lsl", {
      lsl: severityLevel
    }).getMany();

    const logsEntities = logs.map((log) => LogEntity.fromObject(log));

    return logsEntities;
  }

}