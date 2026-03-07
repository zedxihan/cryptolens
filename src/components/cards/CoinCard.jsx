import { ChevronUp, ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

const iconProps = { size: 18, strokeWidth: 4 };

export default function CoinCard({ coin }) {
  
  const change = Number(
    coin.price_change_percentage_24h_in_currency ??
    coin.price_change_percentage_24h ??
    0
  );

  //MiniChart polish
  let rawChartData = coin.sparkline_in_7d?.price?.slice(-24) || [];

  let chartData = [];
  if (rawChartData.length > 1) {
    const minPrice = Math.min(...rawChartData);
    const maxPrice = Math.max(...rawChartData);
    const range = maxPrice - minPrice || 1;

    chartData = rawChartData.map((price) => ({
      price: ((price - minPrice) / range) * 90 + 5
    }));
  } else {
    chartData = rawChartData.map(() => ({ price: 50 }));
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 hover:shadow-lg transition-all">

      <div className="flex justify-between items-center">

      {/* Left Side */}
      <div>
        <div className="flex items-center gap-1">
          <img 
            src={coin.image} 
            alt={coin.name} 
            className="w-5 h-5 rounded-full" />

          <span className="text-sm font-medium">
            {coin.name}
          </span>
        </div>

          <p className="mt-1 text-sm font-medium">
            ${coin.current_price?.toLocaleString() || "N/A"}
          </p>

          <p className={`mt-1 flex items-center gap-0.5 text-sm font-medium ${
            change >= 0 ? "text-price-green" : "text-price-red"}`}>
  
            {change >= 0 
              ? <ChevronUp {...iconProps} /> 
              : <ChevronDown {...iconProps} />}
            {Math.abs(change).toFixed(2)}%
          </p>
      </div>

      {/* Right Side */}
      <div className="w-24 h-12">

        <ResponsiveContainer width="100%" height={48}>
          <LineChart
          data={chartData}
          margin={{ top: 6, right: 6, bottom: 6, left: 6 }}>
            <Line
              type="natural"
                dataKey="price"
                stroke={change >= 0 ? "var(--color-price-green)" : "var(--color-price-red)"}
                strokeWidth={2.3}
                dot={false}
                strokeLinecap="round"
                strokeLinejoin="round"
                />
          </LineChart>
        </ResponsiveContainer>
      </div>

      </div>
    </div>
  );
}
