import React, {useCallback, useMemo} from 'react';
import {ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {
  useState,
  useTranslation,
  useNavigation,
  useEffect,
  useIsFocused,
  usePrevious,
} from '@hooks';
import {
  View,
  Text,
  QuestionButton,
  GradientBorder,
  VerticalGradientBorder,
} from '@components';
import styles from './styles';
import {getDiscount} from '@reducers/discount';
import {TDiscount, TGlobalState} from '@types';
import {colors} from '@constants';
import 'moment/locale/uk';
import 'moment/locale/ru';
import moment from 'moment';
import {setLoader, setType} from '@reducers/appGlobalState';
import {declOfNum, formatPriceName, literFormat} from '@helpers';

const gradientColors = [
  'rgba(220, 221, 222, 0.1)',
  'rgba(220, 221, 222, 1)',
  'rgba(220, 221, 222, 0.1)',
];

type TProps = {
  dispatch: Dispatch;
  discount: TDiscount;
  fuelType: number;
  initialLoading: boolean;
  loading: boolean;
  language: string;
};

const Promotions: React.FC<TProps> = ({
  dispatch,
  fuelType,
  discount,
  loading,
  initialLoading,
  language,
}) => {
  language === 'ru' ? moment.locale('ru') : moment.locale('uk');
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const previousType = usePrevious(discount.type);
  const titles = [t('літр'), t('літра'), t('літрів')];
  const {setOptions} = useNavigation();

  useEffect(() => {
    setOptions({
      headerLeft: () => <QuestionButton />,
    });
  }, []);

  useEffect(() => {
    if (isFocused && fuelType !== previousType) {
      dispatch(getDiscount(fuelType));
    }
  }, [fuelType, isFocused]);

  const discountData = useMemo(() => {
    if (discount) {
      return formatPriceName(discount.discount);
    }
  }, [discount]);

  const chooseType = (value: 1 | 2 | 3) => {
    dispatch(setLoader(true));
    dispatch(setType(value));
  };

  const declOfNumLiters = useCallback(
    (val?: number) => {
      return declOfNum(val ? Math.floor(val) : 0, titles);
    },
    [language],
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.btnWrapper}>
        <GradientBorder colors={gradientColors} />
        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => chooseType(1)}
            style={[styles.btn, fuelType === 1 && styles.activeBtn]}>
            <Text
              style={[
                styles.btnTitle,
                fuelType === 1 && styles.activeBtnTitle,
              ]}>
              {t('Бензин')}
            </Text>
          </TouchableOpacity>
          <VerticalGradientBorder colors={gradientColors} />
          <TouchableOpacity
            onPress={() => chooseType(2)}
            style={[styles.btn, fuelType === 2 && styles.activeBtn]}>
            <Text
              style={[
                styles.btnTitle,
                fuelType === 2 && styles.activeBtnTitle,
              ]}>
              {t('Дизель')}
            </Text>
          </TouchableOpacity>
          <VerticalGradientBorder colors={gradientColors} />
          <TouchableOpacity
            onPress={() => chooseType(3)}
            style={[styles.btn, fuelType === 3 && styles.activeBtn]}>
            <Text
              style={[
                styles.btnTitle,
                fuelType === 3 && styles.activeBtnTitle,
              ]}>
              {t('Газ')}
            </Text>
          </TouchableOpacity>
        </View>
        <GradientBorder colors={gradientColors} />
      </View>
      {initialLoading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator size={'large'} color={colors.red_E30016} />
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{flex: 1}}
            style={styles.container}>
            <View style={styles.dateTimeView}>
              <Text style={styles.year}>
                {moment(discount?.date).format('YYYY')}
              </Text>
              <Text style={styles.month}>
                {moment(discount?.date).format('MMMM').toUpperCase()}
              </Text>
              <Text style={styles.literSum}>
                {literFormat(discount.quantity)}{' '}
                <Text style={styles.liter}>
                  {declOfNumLiters(discount.quantity).toUpperCase()}
                </Text>
              </Text>
            </View>
            <View style={styles.infoView}>
              <GradientBorder colors={gradientColors} />
              <View style={styles.info}>
                <Text style={styles.desc}>
                  {t('До наступного рівня знижки').toUpperCase()}
                  {'  '}
                  <Text style={styles.title}>
                    {literFormat(discount.next_discount)}
                    <Text style={styles.titleDesc}>
                      {' '}
                      {declOfNumLiters(discount?.next_discount)}
                    </Text>
                  </Text>
                </Text>
              </View>
              <GradientBorder colors={gradientColors} />
              <View style={styles.emptyLine} />
              <GradientBorder colors={gradientColors} />
              <View style={styles.info}>
                <Text style={styles.desc}>
                  {t('Ваша поточна знижка').toUpperCase()}
                  {'  '}
                  <Text style={styles.title}>
                    {discountData?.value}
                    <Text style={styles.titleDesc}> {discountData?.title}</Text>
                  </Text>
                </Text>
              </View>
              <GradientBorder colors={gradientColors} />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  discount: state.discount.data,
  fuelType: state.appGlobalState.fuelType,
  loading: state.discount.loading,
  initialLoading: state.discount.initialLoading,
  language: state.appGlobalState.lang,
});

export default connect(mapStateToProps)(Promotions);
