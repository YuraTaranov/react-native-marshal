import React from 'react';
import {useMemo, useTranslation} from '@hooks';
import {View, Text, PromotionView, moment} from '@components';
import {TGlobalState, TPromotion} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import 'moment/locale/uk';

type TProps = {
  promotion: TPromotion;
};

const Promotion: React.FC<TProps> = ({promotion}) => {
  const {t} = useTranslation();

  const date = useMemo(() => {
    return `${t('Акція до')} ${moment(promotion.end)
      .format('LL')
      .slice(0, -2)}`;
  }, [promotion.end]);

  return (
    <View style={styles.container}>
      <PromotionView disabled={true} item={promotion} bgBorderRadius={0} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{promotion?.title}</Text>
        <Text style={styles.description}>{promotion?.text}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  promotion: state.promotion.data,
});

export default connect(mapStateToProps)(Promotion);
