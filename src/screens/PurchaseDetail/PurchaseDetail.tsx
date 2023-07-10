import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {
  useEffect,
  useCallback,
  useTranslation,
  useRoute,
  useNavigation,
} from '@hooks';
import {
  View,
  Text,
  ActivityIndicator,
  GradientBorder,
  FlatList,
} from '@components';
import {parseDate} from '@helpers';
import {getPurchaseDetail, resetPurchaseDetail} from '@reducers/purchaseDetail';
import {colors, gradients} from '@constants';

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
  const {transactionId, transactionDate} = params;
  const {t} = useTranslation();
  const {setOptions} = useNavigation();

  useEffect(() => {
    setOptions({
      title: `${parseDate(transactionDate)}`,
    });
  }, [transactionDate]);

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
              <Text style={styles.itemTitle}>{t('Найменування')}</Text>
              <Text style={{}}>{item.name}</Text>
            </View>
            <View style={styles.itemBlockContainer}>
              <Text style={styles.itemTitle}>{t('Ціна')}</Text>
              <Text>{item.price.toFixed(2)} грн</Text>
            </View>
            <View style={styles.itemBlockContainer}>
              <Text style={styles.itemTitle}>{t('Кількість')}</Text>
              <Text>{item.quantity}</Text>
            </View>
            <View style={styles.itemBlockContainer}>
              <Text style={styles.itemTitle}>{t('Сума')}</Text>
              <Text>{item.amount.toFixed(2)} грн</Text>
            </View>
            <View style={styles.itemBlockContainer}>
              <Text style={styles.itemTitle}>{t('Знижка')}</Text>
              <Text>
                {item.discount_amount
                  ? item.discount_amount.toFixed(2)
                  : item.discount_amount}{' '}
                грн
              </Text>
            </View>
          </View>
          <GradientBorder colors={gradients.gray} style={styles.separator} />
        </>
      ),
      [t],
    );

  const keyExtractor = useCallback(
    (item: TPurchaseDetail, index: number) =>
      `${String(item.name)}-${String(index)}`,
    [],
  );

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
            style={styles.flatList}
          />
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  loading: state.purchaseDetail.loading,
  purchaseDetail: state.purchaseDetail.data,
});

export default connect(mapStateToProps)(PurchaseDetail);
