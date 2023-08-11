import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';

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
  RefreshControl,
  TouchableOpacity,
  LazyLoader,
  SectionList,
  ActivityIndicator,
  StatusBar,
} from '@components';
import {navigate} from '@services';
import {colors} from '@constants';
import {setLazyLoading, getPurchases, setRefreshing} from '@reducers/purchases';

import styles from './styles';
import {ListEmptyComponent} from './components';

//types
import {TGlobalState, TPurchase} from '@types';

type TProps = {
  dispatch: Dispatch;
  purchases: TGlobalState['purchases']['data'];
  lazyLoading: boolean;
  finishLoading: boolean;
  refreshing: boolean;
  loading: boolean;
};

const Purchases: React.FC<TProps> = ({
  dispatch,
  purchases,
  lazyLoading,
  finishLoading,
  refreshing,
  loading,
}) => {
  const {t} = useTranslation();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getPurchases(1));
  }, []);

  const onPressNavigatePurchaseDetail = useCallback(
    (transactionId: number, transactionDate: Date, total_amount: number) =>
      () => {
        navigate('PurchaseDetail', {
          transactionId,
          transactionDate,
          total_amount,
        });
      },
    [navigate],
  );

  const renderItem: ({item}: {item: TPurchase}) => JSX.Element = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onPressNavigatePurchaseDetail(
          item.transaction_id,
          item.date,
          item.total_amount,
        )}>
        <View style={styles.itemContentContainer}>
          <View>
            <Text style={styles.itemTitle}>
              {t('Покупка')} №{item.transaction_id}
            </Text>
            {item.total_discount > 0 ? (
              <Text style={styles.discount}>
                {t('Знижку враховано')}: -{item.total_discount}грн
              </Text>
            ) : null}
          </View>
          <View style={styles.itemPriceContainer}>
            {item.total_discount > 0 ? (
              <Text style={styles.oldPrice}>
                {(item.total_amount + item.total_discount).toFixed(2)} грн
              </Text>
            ) : null}
            <Text style={styles.itemPrice}>
              {item.total_amount.toFixed(2)} грн
            </Text>
          </View>
        </View>

        <View style={styles.bonusesContainer}>
          {item.total_redeem ? (
            <View style={styles.redeemContainer}>
              <Text style={styles.redeem}>
                -{item.total_redeem} {t('Бонуси')}
              </Text>
            </View>
          ) : null}
          {item.total_issuance ? (
            <View style={styles.issuanceContainer}>
              <Text style={styles.issuance}>
                +{item.total_issuance} {t('Бонуси')}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    ),
    [t],
  );

  const keyExtractor: (item: TPurchase) => string = useCallback(
    item => String(item.transaction_id),
    [],
  );

  const onEndReached = useCallback(() => {
    if (!lazyLoading && !finishLoading) {
      dispatch(setLazyLoading(true));
      const newPage = page + 1;
      setPage(newPage);
      dispatch(getPurchases(newPage));
    }
  }, [page, lazyLoading, finishLoading]);

  const onRefresh = useCallback(() => {
    dispatch(setRefreshing(true));
    setPage(1);
    dispatch(getPurchases(1));
  }, [page]);

  const lazyLoader = useMemo(
    () =>
      lazyLoading ? (
        <View style={styles.activityIndicatorContainer}>
          <LazyLoader />
        </View>
      ) : null,
    [lazyLoading],
  );

  const renderSectionHeader = useCallback(
    ({section}: {section: {title: string}}) => {
      const formattedDate = moment(section.title).format('D MMMM, YYYY');
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{formattedDate}</Text>
        </View>
      );
    },
    [],
  );

  const itemSeparatorComponent = useCallback(
    () => <View style={styles.itemSeparator} />,
    [],
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.dark_red_7C2022} />
      {loading && !purchases.length ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={colors.dark_red_7C2022} size="large" />
        </View>
      ) : (
        <SectionList
          sections={purchases}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={keyExtractor}
          style={styles.flatList}
          ItemSeparatorComponent={itemSeparatorComponent}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing}
              colors={[colors.dark_red_7C2022]}
              tintColor={colors.dark_red_7C2022}
              size={24}
            />
          }
          renderSectionHeader={renderSectionHeader}
          initialNumToRender={20}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          ListEmptyComponent={
            !loading && !purchases.length ? <ListEmptyComponent /> : null
          }
          ListFooterComponent={lazyLoader}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  purchases: state.purchases.data,
  finishLoading: state.purchases.finishLoading,
  lazyLoading: state.purchases.lazyLoading,
  refreshing: state.purchases.refreshing,
  loading: state.purchases.loading,
});

export default connect(mapStateToProps)(Purchases);
