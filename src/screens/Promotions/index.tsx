import React from 'react';
import {
  useEffect,
  useCallback,
  useMemo,
  useTranslation,
  useState,
} from '@hooks';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  PromotionView,
} from '@components';
import {TGlobalState, TPromotion} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {Dispatch} from 'redux';
import {getPromotion} from '@reducers/promotion';
import {colors} from '@constants';
import {
  setLazyLoading,
  getPromotions,
  setRefreshing,
} from '@reducers/promotions';

const fakeData: TPromotion[] = [
  {
    id: 1,
    type: 1,
    angle: 1,
    end: '2021-08-21',
    title: 'Хот-дог у подарунок',
    text: 'Заправляй машину та не забудь перекусити',
  },
  {
    id: 2,
    type: 2,
    angle: 2,
    end: '2021-09-25',
    title: 'Хот-дог та Coca-Cola 0.5 л',
    price_new: '69',
    price_old: '89',
  },
  {
    id: 3,
    type: 3,
    angle: 1,
    title: 'Знижка -10%',
    text: 'На першу заправку',
  },
];

type TProps = {
  dispatch: Dispatch;
  finishLoading: boolean;
  lazyLoading: boolean;
  refreshing: boolean;
};

const Promotions: React.FC<TProps> = ({
  dispatch,
  finishLoading,
  lazyLoading,
  refreshing,
}) => {
  const {t} = useTranslation();
  const [page, setPage] = useState<number>(1);

  const onPressItem = useCallback(
    id => () => {
      dispatch(getPromotion(id));
    },
    [],
  );

  const onEndReached = useCallback(() => {
    if (!lazyLoading && !finishLoading) {
      dispatch(setLazyLoading(true));
      const newPage = page + 1;
      setPage(newPage);
      dispatch(getPromotions({page: newPage}));
    }
  }, [page, lazyLoading]);

  const onRefresh = useCallback(() => {
    dispatch(setRefreshing(true));
    setPage(1);
    dispatch(getPromotions({page: 1}));
  }, [page]);

  const renderItem: ({item}: {item: TPromotion}) => JSX.Element = useCallback(
    ({item}) => (
      <PromotionView item={item} onPress={onPressItem} bgBorderRadius={6} />
    ),
    [],
  );

  const keyExtractor: (item: TPromotion) => string = useCallback(
    item => String(item.id),
    [],
  );

  const lazyLoader = useMemo(
    () =>
      lazyLoading ? (
        <ActivityIndicator size={'large'} color={colors.green_27A74C} />
      ) : null,
    [lazyLoading],
  );

  //   FIXME:
  return (
    <View style={styles.container}>
      <FlatList
        data={fakeData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        //   style={styles.flatList}
        // refreshControl={
        //   <RefreshControl
        //     onRefresh={onRefresh}
        //     refreshing={refreshing}
        //     colors={[colors.green_27A74C]}
        //     tintColor={colors.green_27A74C}
        //     size={24}
        //   />
        // }
        // initialNumToRender={20}
        // onEndReachedThreshold={1}
        // onEndReached={onEndReached}
        //   ListEmptyComponent={<ListEmptyComponent />}
        // ListFooterComponent={lazyLoader}
      />
    </View>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  finishLoading: state.promotions.finishLoading,
  lazyLoading: state.promotions.lazyLoading,
  refreshing: state.promotions.refreshing,
});

export default connect(mapStateToProps)(Promotions);
