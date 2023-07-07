import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {
  useEffect,
  useCallback,
  useMemo,
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
        <View style={styles.itemContainer}>
          <View style={styles.itemBlockContainer}>
            <Text style={{}}>{t('Найменування')}</Text>
            <Text style={{}}>{item.name}</Text>
          </View>
          <View style={styles.itemBlockContainer}>
            <Text>{t('Ціна')}</Text>
            <Text>{item.price.toFixed(2)} грн</Text>
          </View>
          <View style={styles.itemBlockContainer}>
            <Text>{t('Кількість')}</Text>
            <Text>{item.quantity}</Text>
          </View>
          <View style={styles.itemBlockContainer}>
            <Text>{t('Сума')}</Text>
            <Text>{item.amount.toFixed(2)} грн</Text>
          </View>
          <View style={styles.itemBlockContainer}>
            <Text>{t('Знижка')}</Text>
            <Text>
              {item.discountAmount
                ? item.discountAmount.toFixed(2)
                : item.discountAmount}{' '}
              грн
            </Text>
          </View>
        </View>
      ),
      [t],
    );

  const keyExtractor: (item: TPurchaseDetail) => string = useCallback(
    item => String(item.id),
    [],
  );

  const separatorComponent = useMemo(
    () => () =>
      <GradientBorder colors={gradients.gray} style={styles.separator} />,
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
            ItemSeparatorComponent={separatorComponent}
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
