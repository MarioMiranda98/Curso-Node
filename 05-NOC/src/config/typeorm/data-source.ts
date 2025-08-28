import { DataSource } from "typeorm";
import { envs } from "../plugins/env.plugin";
import { LogPostgresModel } from "../../data/postgres/postgres.schema";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.POSTGRES_HOST,
  port: envs.POSTGRES_PORT,
  username: envs.POSTGRES_USER,
  password: envs.POSTGRES_PASSWORD,
  database: envs.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [LogPostgresModel],
  subscribers: [],
  migrations: [],
});