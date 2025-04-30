import { scheduleDailyReport } from './scheduler';
import { sendDiscordMessage } from './discord';
import { generateMarketReport } from './scraper/news';

(async () => {
  const message = await generateMarketReport();
  await sendDiscordMessage(message);
  scheduleDailyReport();
})();
