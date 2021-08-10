import React from 'react';
import {Dispatch} from 'redux';
import {
  useCallback,
  useTranslation,
  useState,
  useMemo,
  useEffect,
} from '@hooks';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {declension, colors} from '@constants';
import {setLazyLoading, getPurchases, setRefreshing} from '@reducers/purchases';
import ListEmptyComponent from './components/ListEmptyComponent/ListEmptyComponent';

const fakeData: TPurchase[] = [
  {
    id: 1,
    fuel_name: 'А95',
    volume: '55',
    price: '1 429,85',
    date: '12.08.2021 09:48',
    card: '1234',
  },
  {
    id: 2,
    fuel_name: 'А95',
    volume: '55',
    price: '1 429,85',
    date: '12.08.2021 09:48',
    card: '1234',
  },
];

type TPurchase = {
  id: number;
  fuel_name: string;
  volume: string;
  price: string;
  date: string;
  card: string;
};

type TProps = {
  dispatch: Dispatch;
  lazyLoading: boolean;
  finishLoading: boolean;
  refreshing: boolean;
};

const Purchases: React.FC<TProps> = ({
  dispatch,
  lazyLoading,
  finishLoading,
  refreshing,
}) => {
  const {t} = useTranslation();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    // dispatch(getPurchases({page: 1}));
  }, []);

  const fuelVolume = useCallback(volume => {
    return `${volume} ${declension(Number(volume), [
      t('літр'),
      t('літра'),
      t('літрів'),
    ])}`;
  }, []);

  const renderItem: ({item}: {item: TPurchase}) => JSX.Element = useCallback(
    ({item}) => (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.itemName}>{`${t('Паливо')} ${
            item.fuel_name
          } • ${fuelVolume(item.volume)}`}</Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
        <View>
          <Text style={styles.itemPrice}>{`${item.price} ₴/л`}</Text>
          <Text style={styles.itemCard}>{`** ${item.card}`}</Text>
        </View>
      </View>
    ),
    [],
  );

  const keyExtractor: (item: TPurchase) => string = useCallback(
    item => String(item.id),
    [],
  );

  const onEndReached = useCallback(() => {
    if (!lazyLoading && !finishLoading) {
      // dispatch(setLazyLoading(true));
      //   const newPage = page + 1;
      //   setPage(newPage);
      // dispatch(getPurchases({page: newPage}));
    }
  }, [page, lazyLoading]);

  const onRefresh = useCallback(() => {
    // dispatch(setRefreshing(true));
    // setPage(1);
    // dispatch(getPurchases({page: 1}));
  }, [page]);

  const lazyLoader = useMemo(
    () =>
      lazyLoading ? (
        <ActivityIndicator size={'large'} color={colors.green_27A74C} />
      ) : null,
    [lazyLoading],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={fakeData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.flatList}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            colors={[colors.green_27A74C]}
            tintColor={colors.green_27A74C}
            size={24}
          />
        }
        initialNumToRender={20}
        onEndReachedThreshold={1}
        onEndReached={onEndReached}
        ListEmptyComponent={<ListEmptyComponent />}
        ListFooterComponent={lazyLoader}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  finishLoading: state.purchases.finishLoading,
  lazyLoading: state.purchases.lazyLoading,
  refreshing: state.purchases.refreshing,
});

export default connect(mapStateToProps)(Purchases);
