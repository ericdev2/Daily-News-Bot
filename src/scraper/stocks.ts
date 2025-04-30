import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

export async function getStockPrices(symbols: string[]): Promise<string[]> {
  const apiKey = process.env.TWELVE_DATA_API_KEY;
  const results: string[] = [];

  for (const symbol of symbols) {
    try {
      const response = await axios.get('https://api.twelvedata.com/quote', {
        params: {
          symbol,
          apikey: apiKey
        }
      });

      const data = response.data;
      if (data && data.close && data.percent_change) {
        results.push(`${symbol}: $${Number(data.close).toFixed(2)} (${Number(data.percent_change).toFixed(2)}%)`);
      } else {
        results.push(`${symbol}: unavailable`);
      }
    } catch (err: any) {
      console.error(`Error fetching ${symbol}:`, err.message);
      results.push(`${symbol}: error`);
    }
  }

  return results;
}
