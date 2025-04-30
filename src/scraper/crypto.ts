import axios from 'axios';

export async function getCryptoPrices(cryptos: string[]): Promise<string[]> {
  const ids = cryptos.join(',');
  const url = 'https://api.coingecko.com/api/v3/simple/price';

  try {
    const response = await axios.get(url, {
      params: {
        ids,
        vs_currencies: 'usd',
        include_24hr_change: 'true'
      }
    });

    return Object.entries(response.data).map(([key, value]: any) => {
      const price = value.usd;
      const change = value.usd_24h_change;
      return `${key.toUpperCase()}: $${price.toFixed(2)} (${change.toFixed(2)}%)`;
    });
  } catch (err) {
    console.error("Error fetching crypto prices:", err);
    return cryptos.map(sym => `${sym.toUpperCase()}: unavailable`);
  }
}
