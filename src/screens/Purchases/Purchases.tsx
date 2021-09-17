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
import {TGlobalState, TPurchase} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {declension, colors} from '@constants';
import {setLazyLoading, getPurchases, setRefreshing} from '@reducers/purchases';
import ListEmptyComponent from './components/ListEmptyComponent/ListEmptyComponent';
import moment from 'moment';

type TProps = {
  dispatch: Dispatch;
  purchases: TPurchase[];
  lazyLoading: boolean;
  finishLoading: boolean;
  refreshing: boolean;
};

const Purchases: React.FC<TProps> = ({
  dispatch,
  purchases,
  lazyLoading,
  finishLoading,
  refreshing,
}) => {
  const {t} = useTranslation();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getPurchases({page: 1}));
  }, []);

  const fuelVolume = useCallback(volume => {
    return `${volume} ${declension(Number(volume), [
      t('літр'),
      t('літра'),
      t('літрів'),
    ])}`;
  }, []);

  const parseDate = useCallback(date => {
    return moment(date).format('DD.MM.YYYY hh:mm');
  }, []);

  const parseFuel = useCallback(fuelId => {
    if (fuelId === 1) return t('ДТ');
    if (fuelId === 2) return 'А95';
    if (fuelId === 3) return 'А98';
    return 'А98+';
  }, []);

  const renderItem: ({item}: {item: TPurchase}) => JSX.Element = useCallback(
    ({item}) => (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.itemName}>{`${t('Паливо')} ${parseFuel(
            item.fuel_id,
          )} • ${fuelVolume(item.liters)}`}</Text>
          <Text style={styles.itemDate}>{parseDate(item.created_at)}</Text>
        </View>
        <View>
          <Text style={styles.itemPrice}>{`${item.many} ₴`}</Text>
          <Text style={styles.itemCard}>{`** ${item.credit_card}`}</Text>
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
      dispatch(setLazyLoading(true));
      const newPage = page + 1;
      setPage(newPage);
      dispatch(getPurchases({page: newPage}));
    }
  }, [page, lazyLoading]);

  const onRefresh = useCallback(() => {
    dispatch(setRefreshing(true));
    setPage(1);
    dispatch(getPurchases({page: 1}));
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
        data={purchases}
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
        initialNumToRender={10}
        onEndReachedThreshold={1}
        onEndReached={onEndReached}
        ListEmptyComponent={<ListEmptyComponent />}
        ListFooterComponent={lazyLoader}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  purchases: state.purchases.data,
  finishLoading: state.purchases.finishLoading,
  lazyLoading: state.purchases.lazyLoading,
  refreshing: state.purchases.refreshing,
});

export default connect(mapStateToProps)(Purchases);
