import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {
  useEffect,
  useCallback,
  useTranslation,
  useRoute,
  useMemo,
} from '@hooks';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Icon,
  TouchableOpacity,
  Linking,
} from '@components';
import {getPurchaseDetail, resetPurchaseDetail} from '@reducers/purchaseDetail';
import {colors} from '@constants';
import {formatDate, getQuantityType} from '@helpers';

import styles from './styles';

//types
import {PurchaseDetailRouteProp, TGlobalState, TPurchaseDetail} from '@types';

type TProps = {
  dispatch: Dispatch;
  loading: TGlobalState['purchaseDetail']['loading'];
  purchaseDetail: TGlobalState['purchaseDetail']['data'];
};

const PurchaseDetail: React.FC<TProps> = ({
  dispatch,
  loading,
  purchaseDetail,
}) => {
  const {params} = useRoute<PurchaseDetailRouteProp>();
  const {transactionId, transactionDate, total_amount} = params;
  const {t} = useTranslation();

  useEffect(() => {
    if (transactionId) {
      dispatch(getPurchaseDetail(params.transactionId));
    }

    return () => {
      dispatch(resetPurchaseDetail());
    };
  }, [transactionId]);

  const renderItem: ({item}: {item: TPurchaseDetail}) => JSX.Element =
    useCallback(
      ({item}) => (
        <>
          <View style={styles.itemContainer}>
            <View style={styles.itemBlockContainer}>
              <Text style={styles.itemTitle}>
                {item.name}, {item.quantity}{' '}
                {getQuantityType(item.product_code)}
              </Text>
              <Text style={styles.itemPrice}>{item.amount.toFixed(2)} грн</Text>
            </View>
            {item.discount_amount > 0 ? (
              <Text style={styles.discount}>
                {t('Знижку враховано')}: -{item.discount_amount}грн
              </Text>
            ) : null}
            <View style={styles.bonusesContainer}>
              {item.bonus_redeem ? (
                <View style={styles.redeemContainer}>
                  <Text style={styles.redeem}>
                    -{item.bonus_redeem} {t('Бонуси')}
                  </Text>
                </View>
              ) : null}
              {item.bonus_issuance ? (
                <View style={styles.issuanceContainer}>
                  <Text style={styles.issuance}>
                    +{item.bonus_issuance} {t('Бонуси')}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </>
      ),
      [t],
    );

  const keyExtractor = useCallback(
    (item: TPurchaseDetail, index: number) =>
      `${String(item.name)}-${String(index)}`,
    [],
  );
  const purchaseDate = useMemo(
    () => formatDate(transactionDate),
    [transactionDate],
  );

  const listHeaderComponent = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <View style={styles.headerDateContainer}>
          <Text style={styles.headerDescription}>
            {purchaseDate.formattedDate}
          </Text>
          <Text style={styles.headerDescription}>
            {purchaseDate.formattedTime}
          </Text>
        </View>
        <View style={styles.headerPriceContainer}>
          <Text style={styles.headerDescription}>{t('Загальна сума')}</Text>
          <Text style={styles.headerTotalPrice}>{total_amount.toFixed(2)}</Text>
        </View>
      </View>
    ),
    [transactionDate],
  );

  const itemSeparatorComponent = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  const onPressCall = useCallback(() => {
    Linking.openURL(`tel:+380800508555`);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={colors.red_E30016}
          style={styles.activityIndicator}
        />
      ) : (
        <View>
          <FlatList
            data={purchaseDetail}
            renderItem={renderItem}
            bounces={false}
            keyExtractor={keyExtractor}
            ListHeaderComponent={listHeaderComponent}
            style={styles.flatList}
            ItemSeparatorComponent={itemSeparatorComponent}
          />
        </View>
      )}
      <View style={styles.footer}>
        <Text style={styles.footerDescription}>{t('Тов “Маршал”')}</Text>
        <TouchableOpacity
          style={styles.footerContactContainer}
          onPress={onPressCall}>
          <Icon name="phone" color={colors.green_289E42} size={13} />
          <Text style={styles.footerContact}>
            {t('Гаряча лінія')}: +38-080-050-85-55
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  loading: state.purchaseDetail.loading,
  purchaseDetail: state.purchaseDetail.data,
});

export default connect(mapStateToProps)(PurchaseDetail);
