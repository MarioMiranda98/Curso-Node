import { envs } from "../../../configs/envs.js";

export class DiscordService {
  private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL;

  constructor() { }

  async notify(message: string) {
    const body = {
      content: message,
      embeds: [
        {
          image: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjZycHVhaG5jcXNqcG43ZWtpMW9vNGYwZnU0OGhuem91Zmh6ZWNnaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif' }
        }
      ]
    };

    const response = await fetch(this.discordWebhookUrl, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log('Error sending message to discord');
      return false;
    }

    return true;
  }
}