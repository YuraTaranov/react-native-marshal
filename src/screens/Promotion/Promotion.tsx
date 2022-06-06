import React from 'react';
import {useMemo, useTranslation, useLayoutEffect, useNavigation} from '@hooks';
import {View, Text, PromotionView, moment, ScrollView} from '@components';
import {TGlobalState, TPromotion} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import 'moment/locale/uk';
import 'moment/locale/ru';

type TProps = {
  promotion: TPromotion;
  language: string;
};

const Promotion: React.FC<TProps> = ({promotion, language}) => {
  const {t} = useTranslation();
  language === 'ru' ? moment.locale('ru') : moment.locale('uk');
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      title:
        promotion.type === 'action'
          ? t('Акція')
          : promotion.type === 'discount'
          ? t('Знижка')
          : t('Новина'),
    });
  }, [promotion.type, t]);

  const date = useMemo(() => {
    return `${
      promotion?.type === 'action' ? t('Акція до') : t('Знижка до')
    } ${moment(promotion?.end).format('LL').slice(0, -2)}`;
  }, [promotion.end, promotion?.type, t]);

  return (
    <View style={styles.container}>
      <PromotionView disabled={true} item={promotion} bgBorderRadius={0} />
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>{promotion?.title}</Text>
        <Text style={styles.description}>{promotion?.text}</Text>
        {promotion.type !== 'new' ? (
          <Text style={styles.date}>{date}</Text>
        ) : null}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  promotion: state.promotion.data,
  language: state.appGlobalState.lang,
});

export default connect(mapStateToProps)(Promotion);
