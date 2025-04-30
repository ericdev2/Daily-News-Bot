import axios from 'axios';
import { getStockPrices } from './stocks';
import { getCryptoPrices } from './crypto';
import dotenv from 'dotenv';
import { sendDiscordMessage } from '../discord';

dotenv.config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function getMarketHeadlines(): Promise<string[]> {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines`,
      {
        params: {
          category: 'business',
          language: 'en',
          pageSize: 5,
          apiKey: NEWS_API_KEY,
        },
      }
    );

    const headlines = response.data.articles.map((a: any) => a.title);
    return headlines;
  } catch (err: any) {
    console.error('Error fetching news headlines:', err.message);
    return ['Unable to fetch news at this time.'];
  }
}

export async function generateMarketReport(): Promise<string> {
  const stocks = await getStockPrices(['TSLA', 'AAPL', 'MSFT', 'COST', 'AMZN']);
  const cryptos = await getCryptoPrices(['bitcoin', 'ethereum', 'solana']);
  const headlines = await getMarketHeadlines();

  return `
📈 **Stocks**
${stocks.join('\n')}

💰 **Crypto**
${cryptos.join('\n')}

📰 **News**
${headlines.map((h, i) => `${i + 1}. ${h}`).join('\n')}
  `.trim();
}

export async function runBot() {
  const message = await generateMarketReport();
  await sendDiscordMessage(message);
}
