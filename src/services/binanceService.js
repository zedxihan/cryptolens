const GLOBAL_URL = 'https://api.binance.com/api/v3';
const US_URL = 'https://api.binance.us/api/v3';

//Symbol Cleaner
const STABLECOINS = ['USDC', 'USDP', 'TUSD', 'PAX', 'DAI', 'EUR', 'GBP', 'FDUSD']
function validPair(symbol) {
    const coin = symbol.replace('USDT', '');
    return symbol.endsWith('USDT') && !STABLECOINS.includes(coin);
}

//Ticker Formatter
function formatTicker(ticker) {
    const symbolClean = ticker.symbol.replace('USDT', '').toLowerCase();

    return {
        id: ticker.symbol,
        symbol: symbolClean,
        name: ticker.symbol.replace('USDT', ''),
        current_price: +ticker.lastPrice,
        price_change_percentage_24h: parseFloat(ticker.priceChangePercent),
        total_volume: parseFloat(ticker.quoteVolume),
        market_cap: null,
        image: `https://assets.coincap.io/assets/icons/${symbolClean}@2x.png`
    }
}


//Fetcher & error handler
async function fetchJSON(path) {
    try {
        const response = await fetch(`${GLOBAL_URL}${path}`)
        if (!response.ok) throw new Error('Global API blocked')
        return await response.json();

    } catch {
        try {
            const response = await fetch(`${US_URL}${path}`)
            if (!response.ok) throw new Error('US API blocked')
            return await response.json();
        } catch (error) {
            
            console.error('Fetch error:', error)
            return [];
        }
    }
}

//Popular Four
export async function getPopularFour() {
    const POPULAR_COINS = ['BNBUSDT', 'SOLUSDT', 'AVAXUSDT', 'SUIUSDT'];
    const tickers = await fetchJSON(`/ticker/24hr?symbols=${JSON.stringify(POPULAR_COINS)}`);

    const klinePromises = POPULAR_COINS.map(coin => 
        fetchJSON(`/klines?symbol=${coin}&interval=1h&limit=24`)
    )
    const allKlines = await Promise.all(klinePromises);

    return tickers.map((ticker, index) => {
        const formatted = formatTicker(ticker)

        formatted.sparkline_in_1d = {
            price: allKlines[index].map(k => +k[4])
        }
        return formatted;
    })
}

//Trending Coins
export async function getTrendingCoins() {
    const tickers = await fetchJSON('/ticker/24hr')

    return tickers
            .filter(t => validPair(t.symbol))
            .sort((a, b) => +b.quoteVolume - +a.quoteVolume)
            .slice(0, 10) //showing 4 rn
            .map(formatTicker);
}

//Top Gainers
export async function getTopGainers() {
    const tickers = await fetchJSON('/ticker/24hr');

    return tickers
            .filter(t => {
                return (
                validPair(t.symbol) &&
                +t.quoteVolume > 1000000 &&
                +t.priceChangePercent > 0
                );
            })
            .sort((a, b) => +b.priceChangePercent - +a.priceChangePercent)
            .slice(0, 10) // showing 4 rn
            .map(formatTicker);
}