export default function Footer() {
  return (
    <footer className="w-full bg-white border-b border-slate-200 px-3 py-4 text-center">
      <p>
        Price and market data provided by{' '}
        <a
          href="https://www.coingecko.com?utm_source=CryptoLens&utm_medium=web"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          CoinGecko
        </a>
      </p>
     
    </footer>
  );
}