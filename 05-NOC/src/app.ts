import 'dotenv/config';
import "reflect-metadata"

import { Server } from "./presentation/server";
import { MongoDatabse } from './data/mongo/init';
import { envs } from './config/plugins/env.plugin';
import { AppDataSource } from './config/typeorm/data-source';

const main = async () => {
  await MongoDatabse.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  await AppDataSource.initialize();

  Server.start();
}

(async () => {
  main();
})();