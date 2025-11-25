import type { Request, Response } from 'express';
import type { GithubService } from '../services/github/github.service.js';
import { DiscordService } from '../services/discord/discord.service';

export class GithubController {
  constructor(private readonly ghService: GithubService, private readonly discordService: DiscordService) { }

  webhookHandler = (req: Request, res: Response) => {
    let message: string = "";
    const githubEvent = req.header('x-github-event') ?? 'unknown'
    const payload = req.body;

    switch (githubEvent) {
      case 'star':
        message = this.ghService.onStart(payload);
        break;
      case 'issues':
        message = this.ghService.onIssue(payload);
        break;
      default:
        console.log('Unknown event');
    }

    this.discordService.notify(message).then(() => res.status(202).send('Accepted')).catch(() => res.status(500).send('Internal Server Error'));
  }
}