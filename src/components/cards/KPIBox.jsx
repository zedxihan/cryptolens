import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react"; 

const iconProps = { size: 18, strokeWidth: 4 };

export default function KPIBox({ title, icon, coins=[] }) {

  const [showAll, setShowAll] = useState(false); //disabled state

  const visibleCoins = showAll ? coins : coins.slice(0, 4);

  return(
    <div className="bg-white border border-slate-200 rounded-xl p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">

        <h2 className="font-semibold flex items-center gap-2">
          {icon} {title}
        </h2>

        <button className="text-sm text-slate-500 hover:text-slate-700 cursor-pointer">
          View more →
        </button>

      </div>

      {/* Coin List */}
      <div className="space-y-3">

        {visibleCoins.map((coin) => {

          const change = coin.price_change_percentage_24h || 0;

          return(
            <div
              key={coin.id}
              className="flex justify-between items-center">

              <div className="flex items-center gap-2">
                <img 
                  src={coin.image} 
                  alt={coin.name} 
                  className="w-6 h-6" />
                
                <span className="text-sm font-medium">
                  {coin.name}
                </span>
              </div>

              <div className="text-right flex items-center gap-1">
                <p className="text-sm font-medium">
                  ${coin.current_price?.toLocaleString() || "N/A"}
                </p>

                <p className={`flex items-center gap-0.5 text-sm leading-none font-medium
                                ${change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {change >= 0 
                    ? <ChevronUp {...iconProps} /> 
                    : <ChevronDown {...iconProps} />}
                  {Math.abs(change).toFixed(2)}%
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}