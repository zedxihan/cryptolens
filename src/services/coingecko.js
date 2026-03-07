const API_KEY = import.meta.env.VITE_COINGECKO_DEMO_KEY;
const BASE_URL = "https://api.coingecko.com/api/v3";

function getFetchOptions() {
  const headers = {
    Accept: "application/json",
  };

  if (API_KEY) {
    headers["x-cg-demo-api-key"] = API_KEY;
  }

  return { headers };
}

function get24hChange(coin) {
  return Number(
    coin?.price_change_percentage_24h_in_currency ??
    coin?.price_change_percentage_24h ??
    Number.NEGATIVE_INFINITY
  );
}

// Fetcher & error handler
async function fetchJSON(url) {
  try {
    const response = await fetch(url, getFetchOptions());

    if (!response.ok) {
      let errorDetails = "";

      try {
        const errorJson = await response.json();
        errorDetails = errorJson.error || response.statusText;
      } catch {
        errorDetails = (await response.text()) || response.statusText;
      }

      throw new Error(`API request failed: ${response.status} - ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}

// Trending coins
export async function getTrendingCoins() {
  try {
    const trendingData = await fetchJSON(`${BASE_URL}/search/trending`);
    if (!trendingData?.coins) return [];

    const ids = trendingData.coins.map((coin) => coin.item.id).join(",");

    const marketCoins = await fetchJSON(
      `${BASE_URL}/coins/markets?vs_currency=usd&ids=${ids}&sparkline=false&price_change_percentage=24h`
    );

    const coinMap = new Map(marketCoins.map((coin) => [coin.id, coin]));

    return trendingData.coins
      .map((coin) => coinMap.get(coin.item.id))
      .filter(Boolean);
  } catch (error) {
    console.error("Error fetching trending coins:", error);
    return [];
  }
}

// Top gainers
export async function getTopGainers() {
  try {
    const pages = [1, 2];

    const requests = pages.map((page) =>
      fetchJSON(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=false&price_change_percentage=24h`
      )
    );

    const marketData = (await Promise.all(requests)).flat();

    return marketData
      .filter((coin) => Number.isFinite(get24hChange(coin)))
      .sort((a, b) => get24hChange(b) - get24hChange(a))
      .slice(0, 15);
  } catch (error) {
    console.error("Error fetching top gainers:", error);
    return [];
  }
}

// Popular coins (BTC, ETH, BNB, SOL)
export async function getPopularFour() {
  try {
    return await fetchJSON(
      `${BASE_URL}/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana&sparkline=true`
    );
  } catch (error) {
    console.error("Error fetching popular coins:", error);
    return [];
  }
}