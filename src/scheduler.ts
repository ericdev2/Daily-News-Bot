import cron from 'node-cron';
import { sendDiscordMessage } from './discord';
import { generateMarketReport } from './scraper/news';

export function scheduleDailyReport() {
  cron.schedule('0 8 * * *', async () => {
    const message = await generateMarketReport();
    await sendDiscordMessage(message);
  }, {
    timezone: "America/Los_Angeles"
  });
}
