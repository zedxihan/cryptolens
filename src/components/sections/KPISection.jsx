import { useEffect, useState } from "react";
import KPIBox from "../cards/KPIBox";
import CoinCard from "../cards/CoinCard";
import { getTrendingCoins, getTopGainers, getPopularFour } from "../../services/coingecko"

export default function KPISection() {

  const [trending, setTrending] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [popular, setPopular] = useState([]);

  async function fetchData() {
    try {
      const [trendingData, gainersData, popularData] = await Promise.all([
        getTrendingCoins(),
        getTopGainers(),
        getPopularFour()
      ]);

      setTrending(trendingData || []);
      setGainers(gainersData || []);
      setPopular(popularData || []);

    } catch (error) {
      console.error("Failed to load data", error);
    }
  }

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 60000);

    // cleanup
    return () => {
      clearInterval(intervalId);
    }

  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 m-3">

      {/* LEFT: 4 Popular Coins*/}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {popular.map((coin) => {
          return (
          <CoinCard 
            key={coin.id}
            coin={coin}
            chartData={coin.sparkline_in_7d?.price} />
          );
        })}
      </div>

      {/* MIDDLE: Trending KPIBox */}
        <KPIBox
          title="Trending"
          icon="🔥"
          coins={trending}
        />

        {/* RIGHT: Top Gainers KPIBox */}
        <KPIBox
          title="Top Gainers"
          icon="🚀"
          coins={gainers}
        />
    </div>
  );
}