import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

export async function sendDiscordMessage(message: string) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) throw new Error("DISCORD_WEBHOOK_URL is not set");

  await axios.post(webhook, { content: message });
}
