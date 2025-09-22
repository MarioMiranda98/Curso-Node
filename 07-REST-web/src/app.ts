import { envs } from './config/envs.ts';
import { AppRoutes } from './presentation/routes.ts';
import { Server } from './presentation/server.ts';

(async () => {
  main();
})();

async function main() {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  await server.start();
}
