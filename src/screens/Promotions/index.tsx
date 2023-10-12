import React, {useCallback, useMemo} from 'react';
import {ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {useState, useTranslation, useNavigation, useEffect} from '@hooks';
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
import {setLoader} from '@reducers/appGlobalState';

const gradientColors = [
  'rgba(220, 221, 222, 0.1)',
  'rgba(220, 221, 222, 1)',
  'rgba(220, 221, 222, 0.1)',
];

type TProps = {
  dispatch: Dispatch;
  discount: TDiscount | null;
  initialLoading: boolean;
  loading: boolean;
  language: string;
};

const Promotions: React.FC<TProps> = ({
  dispatch,
  discount,
  loading,
  initialLoading,
  language,
}) => {
  language === 'ru' ? moment.locale('ru') : moment.locale('uk');
  const {t} = useTranslation();
  const [type, setType] = useState<1 | 2 | 3>(1);
  const {setOptions} = useNavigation();

  useEffect(() => {
    setOptions({
      headerLeft: () => <QuestionButton />,
    });
  }, []);

  useEffect(() => {
    dispatch(getDiscount(type));
  }, [type]);

  const discountData = useMemo(() => {
    if (discount) {
      const data = discount.discount.toFixed(2);
      const spitValue = data.split('.');
      const value =
        discount.discount < 1
          ? spitValue[1]
          : spitValue[1] === '00'
          ? spitValue[0]
          : `${spitValue[0]}.${spitValue[1]}`;
      return {
        title: discount.discount < 1 ? 'коп./л' : 'грн./л',
        value,
      };
    }
  }, [discount]);

  const chooseType = useCallback((value: 1 | 2 | 3) => {
    dispatch(setLoader(true));
    setType(value);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.btnWrapper}>
        <GradientBorder colors={gradientColors} />
        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => chooseType(1)}
            style={[styles.btn, type === 1 && styles.activeBtn]}>
            <Text
              style={[styles.btnTitle, type === 1 && styles.activeBtnTitle]}>
              {t('Бензин')}
            </Text>
          </TouchableOpacity>
          <VerticalGradientBorder colors={gradientColors} />
          <TouchableOpacity
            onPress={() => chooseType(2)}
            style={[styles.btn, type === 2 && styles.activeBtn]}>
            <Text
              style={[styles.btnTitle, type === 2 && styles.activeBtnTitle]}>
              {t('Дизель')}
            </Text>
          </TouchableOpacity>
          <VerticalGradientBorder colors={gradientColors} />
          <TouchableOpacity
            onPress={() => chooseType(3)}
            style={[styles.btn, type === 3 && styles.activeBtn]}>
            <Text
              style={[styles.btnTitle, type === 3 && styles.activeBtnTitle]}>
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
                {discount?.quantity}{' '}
                <Text style={styles.liter}>{t('Літрів').toUpperCase()}</Text>
              </Text>
            </View>
            <View style={styles.infoView}>
              <GradientBorder colors={gradientColors} />
              <View style={styles.info}>
                <Text style={styles.desc}>
                  {t('До наступного рівня знижки').toUpperCase()}
                  {'  '}
                  <Text style={styles.title}>
                    {discount?.next_discount}
                    <Text style={styles.titleDesc}> {t('літрів')}</Text>
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
  loading: state.discount.loading,
  initialLoading: state.discount.initialLoading,
  language: state.appGlobalState.lang,
});

export default connect(mapStateToProps)(Promotions);
