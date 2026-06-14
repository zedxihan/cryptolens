import { Context, Hono } from 'hono';
import { fetchUpstream, ROUTES, type Env } from '../fetch';
import type {
  FormattedTicker,
  RawChartRes,
  RawCoinRes,
  RawGlobalRes,
  RawSearchRes,
  RawSimplePriceRes,
} from '../types';

const app = new Hono<{ Bindings: Env }>();

// DRY fetcher
const getCG = (c: Context<{ Bindings: Env }>, ttl: number) => {
  c.header('Cache-Control', `public, s-maxage=${ttl}`);
  return async <T>(path: string) =>
    fetchUpstream<T>({
      routeKey: '/coingecko',
      path,
      env: c.env,
      customTtl: ttl,
    });
};

const STABLECOINS = new Set([
  'usdt',
  'usdc',
  'usdp',
  'tusd',
  'pax',
  'dai',
  'eur',
  'gbp',
  'fdusd',
  'usd1',
]);

const POPULAR_MAP = [
  { symbol: 'PAXG', name: 'PAXG', cgId: 'pax-gold' },
  { symbol: 'XRP', name: 'XRP', cgId: 'ripple' },
  { symbol: 'BNB', name: 'BNB', cgId: 'binancecoin' },
  { symbol: 'SOL', name: 'Solana', cgId: 'solana' },
];

const formatTicker = (
  coin: RawCoinRes,
  nameFallback?: string,
): FormattedTicker => ({
  id: `${coin.symbol.toUpperCase()}USDT`,
  symbol: coin.symbol.toLowerCase(),
  name: nameFallback || coin.name,
  current_price: coin.current_price,
  price_change_percentage_24h: coin.price_change_percentage_24h,
  total_volume: coin.total_volume,
  market_cap: coin.market_cap,
  image: coin.image,
});

const fetchVolumeMarkets = (c: Context<{ Bindings: Env }>) =>
  getCG(
    c,
    900,
  )<RawCoinRes[]>(
    '/coins/markets?vs_currency=usd&order=volume_desc&per_page=100&page=1',
  );

// Dashboard
app.get('/dashboard', async (c) => {
  const fetch = getCG(c, 10800); // 3hr
  const days = c.req.query('days') || '30';

  const [globalRes, btcChart, btcImage, ethImage] = await Promise.all([
    fetch<RawGlobalRes>('/global'),
    fetch<RawChartRes>(
      `/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`,
    ),
    resolveIcon(c, 'btc'),
    resolveIcon(c, 'eth'),
  ]);

  const global = globalRes?.data;
  const btcDom = global?.market_cap_percentage?.btc;
  const ethDom = global?.market_cap_percentage?.eth;

  if (
    !global?.total_market_cap?.usd ||
    !btcDom ||
    !btcChart?.market_caps?.length
  ) {
    throw new Error('Failed to parse dashboard data');
  }

  const domRatio = btcDom / 100;

  return c.json({
    global: {
      total_mcap: global.total_market_cap.usd,
      total_volume: global.total_volume.usd,
      mcap_change_percentage_24h: global.market_cap_change_percentage_24h_usd,
    },
    dominance: [
      { symbol: 'BTC', value: btcDom, image: btcImage },
      { symbol: 'ETH', value: ethDom, image: ethImage },
    ],
    chart: btcChart.market_caps.map(([time, btcMcap], i) => ({
      timestamp: time,
      market_cap: Math.round(btcMcap / domRatio),
      volume: Math.round((btcChart.total_volumes?.[i]?.[1] || 0) / domRatio),
    })),
  });
});

// Get Top 100
app.get('/top100', async (c) => {
  const fetch = getCG(c, 21600); // 6hr
  const tickers = await fetch<RawCoinRes[]>(
    '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true',
  );
  if (!Array.isArray(tickers)) return c.json([]);

  return c.json(
    tickers.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol.toLowerCase(),
      name: coin.name,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      image: coin.image,
      sparkline: coin.sparkline_in_7d?.price || [],
    })),
  );
});

// Search Coins
app.get('/search', async (c) => {
  const fetch = getCG(c, 120);
  const query = c.req.query('query');
  if (!query?.trim()) return c.json([]);

  const res = await fetch<RawSearchRes>(
    `/search?query=${encodeURIComponent(query)}`,
  );
  const coins = res?.coins?.slice(0, 8);
  if (!coins?.length) return c.json([]);

  const fallback = await fetch<RawSimplePriceRes>(
    `/simple/price?ids=${coins.map((coin) => coin.id).join(',')}&vs_currencies=usd&include_24hr_change=true`,
  );

  return c.json(
    coins.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toLowerCase(),
      image: coin.thumb,
      current_price: fallback?.[coin.id]?.usd ?? 0,
      price_change_percentage_24h: fallback?.[coin.id]?.usd_24h_change ?? 0,
    })),
  );
});

// Trending
app.get('/trending', async (c) => {
  const limit = Number(c.req.query('limit') || 25);
  const raw = await fetchVolumeMarkets(c);
  if (!Array.isArray(raw)) return c.json([]);

  const data = raw
    .filter((coin) => !STABLECOINS.has(coin.symbol.toLowerCase()))
    .slice(0, limit)
    .map((coin) => formatTicker(coin));
  return c.json(data);
});

// Top Gainers
app.get('/gainers', async (c) => {
  const limit = Number(c.req.query('limit') || 25);
  const raw = await fetchVolumeMarkets(c);
  if (!Array.isArray(raw)) return c.json([]);

  const data = raw
    .filter(
      (coin) =>
        !STABLECOINS.has(coin.symbol.toLowerCase()) &&
        coin.total_volume > 1e6 &&
        coin.price_change_percentage_24h > 0,
    )
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h,
    )
    .slice(0, limit)
    .map((coin) => formatTicker(coin));
  return c.json(data);
});

// Popular
app.get('/popular', async (c) => {
  const fetch = getCG(c, 21600); // 6hr
  const ids = POPULAR_MAP.map((p) => p.cgId).join(',');
  const raw = await fetch<RawCoinRes[]>(
    `/coins/markets?vs_currency=usd&ids=${ids}&sparkline=true`,
  );
  if (!Array.isArray(raw)) return c.json([]);

  const coinMap = new Map(raw.map((coin) => [coin.id, coin]));

  const data = POPULAR_MAP.map((p) => {
    const coin = coinMap.get(p.cgId);
    if (!coin) return null;

    return {
      ...formatTicker(coin, p.name),
      sparkline_in_1d: {
        price: (coin.sparkline_in_7d?.price ?? []).slice(-24),
      },
    };
  }).filter(Boolean);

  return c.json(data);
});

// for internal routes
export const resolveIcon = async (
  c: Context<{ Bindings: Env }>,
  name: string,
) => {
  if (!name) return '';

  const key = name.trim().toLowerCase().replace(/\s+/g, '-');
  const fallback = `${ROUTES['/avatars'].base}/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;

  const cached = await c.env.ICONS?.get(key).catch(() => null);
  if (cached) return cached;

  const fetch = getCG(c, 86400);
  const url = await fetch<RawSearchRes>(
    `/search?query=${encodeURIComponent(name)}`,
  )
    .then((res) => res?.coins?.[0]?.large ?? fallback)
    .catch(() => fallback);

  if (c.env.ICONS) {
    c.executionCtx.waitUntil(
      c.env.ICONS.put(key, url, { expirationTtl: 86400 * 30 }).catch(() => {}),
    );
  }
  return url;
};

export default app;
