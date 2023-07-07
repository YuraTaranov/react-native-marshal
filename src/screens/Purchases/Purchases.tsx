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
  TouchableOpacity,
  GradientBorder,
} from '@components';
import {TGlobalState, TProfile, TPurchase} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {declension, colors, sizes, gradients} from '@constants';
import {setLazyLoading, getPurchases, setRefreshing} from '@reducers/purchases';
import ListEmptyComponent from './components/ListEmptyComponent/ListEmptyComponent';
import moment from 'moment';
import {BonusCard, InviteButton} from './components';
import {navigate} from '@services';

type TProps = {
  dispatch: Dispatch;
  purchases: TPurchase[];
  lazyLoading: boolean;
  finishLoading: boolean;
  refreshing: boolean;
  profile: TGlobalState['profile']['data'];
};

const Purchases: React.FC<TProps> = ({
  dispatch,
  purchases,
  lazyLoading,
  finishLoading,
  refreshing,
  profile,
}) => {
  const {t} = useTranslation();
  const [page, setPage] = useState<number>(1);
  const {count_bonus, count_spent_bonus} = profile;

  useEffect(() => {
    dispatch(getPurchases({page: 1}));
  }, []);

  const fuelVolume = useCallback(
    volume => {
      return `${volume} ${declension(Number(volume), [
        t('літр'),
        t('літра'),
        t('літрів'),
      ])}`;
    },
    [t],
  );

  const parseDate = useCallback(date => {
    return moment(date).format('DD.MM.YYYY hh:mm');
  }, []);

  const parseFuel = useCallback(
    fuelId => {
      if (fuelId === 1) return t('ДТ');
      if (fuelId === 2) return 'А95';
      if (fuelId === 3) return 'А98';
      return 'А98+';
    },
    [t],
  );

  const onPressNavigatePurchaseDetail = useCallback(
    (transactionId: number, transactionDate) => () => {
      navigate('PurchaseDetail', {transactionId, transactionDate});
    },
    [navigate],
  );

  const renderItem: ({item}: {item: TPurchase}) => JSX.Element = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onPressNavigatePurchaseDetail(
          item.transactionId,
          item.transactionDate,
        )}>
        <View>
          <Text style={styles.itemDate}>{parseDate(item.transactionDate)}</Text>
        </View>
        <View>
          <Text>{item.totalAmount.toFixed(2)} грн</Text>
        </View>
      </TouchableOpacity>
    ),
    [t],
  );

  const keyExtractor: (item: TPurchase) => string = useCallback(
    item => String(item.transactionId),
    [],
  );

  const onEndReached = useCallback(() => {
    if (!lazyLoading && !finishLoading) {
      dispatch(setLazyLoading(true));
      const newPage = page + 1;
      setPage(newPage);
      dispatch(getPurchases({page: newPage}));
    }
  }, [page, lazyLoading, finishLoading]);

  const onRefresh = useCallback(() => {
    dispatch(setRefreshing(true));
    setPage(1);
    dispatch(getPurchases({page: 1}));
  }, [page]);

  const lazyLoader = useMemo(
    () =>
      lazyLoading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={'large'} color={colors.green_27A74C} />
        </View>
      ) : null,
    [lazyLoading],
  );

  const onPressInviteFriends = useCallback(() => {
    navigate('BonusesStack', {
      screen: 'InviteFriends',
    });
  }, []);

  const listHeaderComponent = useMemo(
    () => (
      <View
        style={styles.headerContainer}>
        <View
          style={styles.headerTitle}>
          <Text>{t('Дата')}</Text>
        </View>
        <View
          style={styles.headerTitle}>
          <Text>{t('Сума')}</Text>
        </View>
      </View>
    ),
    [],
  );
  return (
    <View style={styles.container}>
      <BonusCard count_bonus={count_bonus} />
      <InviteButton onPressHandler={onPressInviteFriends} />
      <FlatList
        data={purchases}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.flatList}
        ItemSeparatorComponent={() => (
          <GradientBorder colors={gradients.gray} />
        )}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={listHeaderComponent}
        // refreshControl={
        //   <RefreshControl
        //     onRefresh={onRefresh}
        //     refreshing={refreshing}
        //     colors={[colors.green_27A74C]}
        //     tintColor={colors.green_27A74C}
        //     size={24}
        //   />
        // }
        initialNumToRender={10}
        onEndReachedThreshold={0.5}
        // onEndReached={onEndReached}
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
  profile: state.profile.data,
});

export default connect(mapStateToProps)(Purchases);
