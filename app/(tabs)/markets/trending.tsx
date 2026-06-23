import { CoinList } from '@/components/layout/CoinList';
import { useTrendingCoinsQuery } from '@/services/queries';
import { View } from 'react-native';

export default function TrendingScreen() {
  const { data, isFetching, isError } = useTrendingCoinsQuery();

  return (
    <View className="bg-bg flex-1 px-1">
      <CoinList
        coins={data}
        isFetching={isFetching}
        isError={isError}
        initialSort={{ field: 'total_volume' }}
      />
    </View>
  );
}
