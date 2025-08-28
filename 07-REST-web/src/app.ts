import { envs } from './config/envs.ts';
import { Server } from './presentation/server.ts';

(async () => {
  main();
})();

async function main() {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
  });

  await server.start();
}