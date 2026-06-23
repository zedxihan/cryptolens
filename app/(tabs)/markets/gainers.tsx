import { CoinList } from '@/components/layout/CoinList';
import { useTopGainersQuery } from '@/services/queries';
import { View } from 'react-native';

export default function GainersScreen() {
  const { data, isFetching, isError } = useTopGainersQuery();

  return (
    <View className="bg-bg flex-1 px-1">
      <CoinList
        coins={data}
        isFetching={isFetching}
        isError={isError}
        initialSort={{ field: 'price_change_percentage_24h' }}
      />
    </View>
  );
}
