import React from 'react';
import {useMemo, useTranslation} from '@hooks';
import {View, Text, Image, TouchableOpacity, moment} from '@components';
import styles from './styles';
import {TPromotion} from '@types';
import {fonts} from '@constants';
import 'moment/locale/uk';
import {assets} from '@assets';

type TProps = {
  item: TPromotion;
  onPress?: (id: number) => () => void;
  bgBorderRadius?: number;
  disabled?: boolean;
};

const PromotionView: React.FC<TProps> = ({
  item,
  onPress,
  bgBorderRadius,
  disabled = false,
}) => {
  const {t} = useTranslation();

  const promoEndDate = useMemo(() => {
    return `${t('Акція до')} ${moment(item.end).format('LL').slice(0, -2)}`;
  }, [item.end]);

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
      <Image source={{uri: item?.image}} style={borderRadiusStyles.image} />
      <Image source={background} style={borderRadiusStyles.background} />
      <View style={styles.contentContainer}>
        {item.type !== 'discount' ? (
          <Text style={styles.date}>{promoEndDate}</Text>
        ) : null}
        <Text style={titleStyles} numberOfLines={2} ellipsizeMode="tail">
          {item.type === 'discount'
            ? `${item.title} -${item.discount_percentage}%`
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
            <Text style={styles.priceNew}>{`${item.new_price} ${t(
              'грн',
            )}`}</Text>
            <Text style={styles.priceOld}>{`${item.old_price} ${t(
              'грн',
            )}`}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default PromotionView;
