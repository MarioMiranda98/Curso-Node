import { yarg } from './config/plugins';
import { ServerApp } from './presentation/server-app';

(async () => {
  await main();
})();

async function main() {
  const { b: base, l: limit, s: show, n: name, d: destination } = yarg;

  ServerApp.run({
    name: name,
    base: base,
    limit: limit,
    showTable: show,
    destination: destination,
  });
}