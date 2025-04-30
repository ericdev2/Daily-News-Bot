import { runBot } from './scraper/news';
import cron from 'node-cron';

console.log('Bot started and waiting for next scheduled run...');

cron.schedule('0 8 * * *', () => {
  console.log('Running bot at scheduled time...');
  runBot();
}, {
  timezone: 'America/Los_Angeles',
});
