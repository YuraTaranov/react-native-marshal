import React from 'react';
import {useMemo, useTranslation} from '@hooks';
import {View, Text, TouchableOpacity, moment, Image} from '@components';
import styles from './styles';
import {TPromotion, TGlobalState} from '@types';
import {fonts} from '@constants';
import 'moment/locale/uk';
import 'moment/locale/ru';
import {assets} from '@assets';
import {connect} from 'react-redux';

type TProps = {
  item: TPromotion;
  onPress?: (id: number) => () => void;
  bgBorderRadius?: number;
  disabled?: boolean;
  language: string;
};

const PromotionView: React.FC<TProps> = ({
  item,
  onPress,
  bgBorderRadius,
  language,
  disabled = false,
}) => {
  const {t} = useTranslation();
  language === 'ru' ? moment.locale('ru') : moment.locale('uk');

  const promoEndDate = useMemo(() => {
    return `${t('Акція до')} ${moment(item.end).format('LL').slice(0, -2)}`;
  }, [item.end]);

  //   console.log(JSON.stringify(item, null, 2));

  const prices = useMemo(() => {
    return {
      old:
        item.old_price && item.old_price.split('.')[1] === '00'
          ? Number(item.old_price).toFixed()
          : item.old_price,
      new:
        item.new_price && item.new_price.split('.')[1] === '00'
          ? Number(item.new_price).toFixed()
          : item.new_price,
    };
  }, [item]);

  const titleStyles = useMemo(() => {
    if (item.type === 'action') {
      return [styles.title, {fontSize: 16, fontFamily: fonts.interRegular_400}];
    } else if (item.type === 'discount') {
      return [styles.title, {marginTop: 40}];
    } else {
      return styles.title;
    }
  }, [item.type]);

  const background = useMemo(() => {
    switch (item.type) {
      case 'new':
        return assets.PROMOTION_BG_RED;
      case 'action':
        return assets.PROMOTION_BG_BLUE;
      default:
        return assets.PROMOTION_BG_GREEN;
    }
  }, [item.type]);

  const borderRadiusStyles = useMemo(() => {
    return {
      background: [styles.background, {borderRadius: bgBorderRadius}],
      image: [styles.image, {borderRadius: bgBorderRadius}],
    };
  }, [bgBorderRadius]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress && onPress(item.id)}
      activeOpacity={0.9}
      disabled={disabled}>
      <Image
        source={{uri: item?.image}}
        style={borderRadiusStyles.image}
        fallback={true}
      />
      <Image source={background} style={borderRadiusStyles.background} />
      <View style={styles.contentContainer}>
        {item.type === 'action' ? (
          <Text style={styles.date}>{promoEndDate}</Text>
        ) : null}
        <Text style={titleStyles} numberOfLines={2} ellipsizeMode="tail">
          {item.type === 'discount'
            ? `${t('Знижка')} -${item.discount_percentage}%`
            : item.title}
        </Text>
        {item.type !== 'action' ? (
          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.description}
          </Text>
        ) : null}
        {item.type === 'action' ? (
          <View style={styles.priceContainer}>
            <Text style={styles.priceNew}>{`${prices.new} ${t('грн')}`}</Text>
            <Text style={styles.priceOld}>{`${prices.old} ${t('грн')}`}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  language: state.appGlobalState.lang,
});

export default connect(mapStateToProps)(PromotionView);
