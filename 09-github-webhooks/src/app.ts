import express from 'express';
import { envs } from './configs/envs';
import { GithubController } from './presentation/github/controller.js';
import { GithubService } from './presentation/services/github/github.service.js';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware.js';

(() => {
  main();
})();

function main() {
  const app = express();
  const ghController = new GithubController(new GithubService());

  app.use(express.json());

  app.use(GithubSha256Middleware.verifyGithubSignature);

  app.post('/api/github', ghController.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`App running on port ${envs.PORT}`)
  });
}