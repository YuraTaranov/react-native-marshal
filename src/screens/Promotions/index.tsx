import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {
  useCallback,
  useState,
  useMemo,
  useTranslation,
  useNavigation,
  useEffect,
} from '@hooks';
import {
  View,
  FlatList,
  PromotionView,
  ActivityIndicator,
  RefreshControl,
  Text,
  QuestionButton,
} from '@components';
import {getPromotion} from '@reducers/promotion';
import {
  setLazyLoading,
  getPromotions,
  setRefreshing,
} from '@reducers/promotions';
import {colors} from '@constants';

import styles from './styles';

//types
import {TGlobalState, TPromotion} from '@types';

type TProps = {
  dispatch: Dispatch;
  promotions: TPromotion[];
  refreshing: boolean;
  lazyLoading: boolean;
  endLoading: boolean;
};

const Promotions: React.FC<TProps> = ({
  dispatch,
  promotions,
  refreshing,
  lazyLoading,
  endLoading,
}) => {
  const {t} = useTranslation();
  const [page, setPage] = useState<number>(1);
  const {setOptions} = useNavigation();

  useEffect(() => {
    setOptions({
      headerLeft: () => <QuestionButton />,
    });
  }, []);

  const onPressItem = useCallback(
    id => () => {
      dispatch(getPromotion(id));
    },
    [],
  );

  const onEndReached = useCallback(() => {
    if (!lazyLoading && !endLoading) {
      dispatch(setLazyLoading(true));
      const newPage = page + 1;
      setPage(newPage);
      dispatch(getPromotions({page: newPage}));
    }
  }, [page, lazyLoading, endLoading]);

  const onRefresh = useCallback(() => {
    dispatch(setRefreshing(true));
    setPage(1);
    dispatch(getPromotions({page: 1}));
  }, []);

  const renderItem: ({item}: {item: TPromotion}) => JSX.Element = useCallback(
    ({item}) => <PromotionView item={item} onPress={onPressItem} />,
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

  const ListEmptyComponent = useCallback(() => {
    return (
      <Text style={styles.emptyTitle}>{t(`Нові акції скоро з'являться!`)}</Text>
    );
  }, [t]);

  return (
    <View style={styles.container}>
      <FlatList
        data={promotions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            colors={[colors.green_27A74C]}
            tintColor={colors.green_27A74C}
            size={24}
          />
        }
        initialNumToRender={5}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={lazyLoader}
      />
    </View>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  promotions: state.promotions.data,
  refreshing: state.promotions.refreshing,
  lazyLoading: state.promotions.lazyLoading,
  endLoading: state.promotions.endLoading,
});

export default connect(mapStateToProps)(Promotions);
