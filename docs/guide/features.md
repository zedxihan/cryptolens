# Core Features

CryptoLens is designed to provide a high-frequency, responsive dashboard for cryptocurrency monitoring without the bloat of traditional portfolio tracking apps.

---

## ⚡ Live Prices

CryptoLens utilizes **Binance WebSockets** to stream high-frequency, real-time price updates directly to your screen.

- **WebSocket Streaming:** Instead of continuously polling HTTP endpoints, the app establishes a persistent connection to receive live ticker updates.
- **Low Latency:** Market movements are reflected instantly with minimal overhead on device memory and battery.
- **Wide Coverage:** Supports hundreds of trading pairs.

---

## 📊 ETF Flow Tracking

Cryptocurrency ETFs (Exchange-Traded Funds) are a massive driver of modern market liquidity. CryptoLens aggregates Spot Bitcoin (BTC) and Spot Ethereum (ETH) ETF flows.

- **Daily Net Flows:** Track inflows and outflows on a daily basis.
- **Historical Data:** View historical trends to gauge institutional interest over time.
- **Sourced Proxying:** Pulled and cleaned via our worker backend for fast, cached queries.

---

## 🧠 Market Sentiment (Fear & Greed)

Understanding crowd psychology is vital in volatile markets. CryptoLens integrates the **Crypto Fear & Greed Index**.

- **Sentiment Indicator:** Displays current score (0 to 100) and classification (Extreme Fear, Fear, Neutral, Greed, Extreme Greed).
- **Historic Trends:** See how sentiment has evolved over the past weeks/months.
- **Visual Integration:** Custom progress meters match our terminal-inspired dark green styling.

---

## 📈 Market Insights

Get a holistic overview of the market at any given moment:

- **Gainers & Losers:** Quickly scan top daily performers.
- **Trending Coins:** See which assets are generating the highest search volume.
- **Global Metrics:** Total market capitalization, 24h trading volume, and Bitcoin/Ethereum dominance statistics.

---

## 📉 Interactive Charts

CryptoLens displays optimized sparklines and history charts:

- **Fast Render Sparklines:** View 24h trends directly on list items without lagging scroll performance.
- **Global History Chart:** Interactive charts showing the total market cap history over days, weeks, or months.

---

## 📱 Performance Optimization

Under the hood, CryptoLens is built for extreme speed and smooth responsiveness:

- **NativeWind v5 & Tailwind CSS v4:** Highly optimized, compile-time utility styling mapping directly to React Native primitives.
- **Shopify FlashList:** Replaces standard React Native FlatLists, enabling 120Hz smooth scrolling for lists containing hundreds of items by recycling views.
- **Zustand & TanStack Query:** Lightweight global state management paired with robust asynchronous cache management (stale-while-revalidate, background refetching).
- **Serverless Edge Caching:** The Cloudflare Worker proxy caches external third-party API payloads in KV storage, bypassing strict API rate limits and reducing page loads to milliseconds.
