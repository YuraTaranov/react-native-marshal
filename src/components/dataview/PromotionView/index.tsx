import React from 'react';
import {useMemo, useTranslation} from '@hooks';
import {View, Text, TouchableOpacity, moment, Image} from '@components';
import styles from './styles';
import {TPromotion, TGlobalState} from '@types';
import {fonts} from '@constants';
import 'moment/locale/uk';
import 'moment/locale/ru';
import 'moment/locale/en-ca';
import {assets} from '@assets';
import {connect} from 'react-redux';

type TProps = {
  item: TPromotion;
  onPress?: (id: number) => () => void;
  disabled?: boolean;
  language: string;
};

const PromotionView: React.FC<TProps> = ({
  item,
  onPress,
  language,
  disabled = false,
}) => {
  const {t} = useTranslation();
  language ? moment.locale(language) : moment.locale('uk');

  const promoEndDate = useMemo(() => {
    return `${item.type === 'action' ? t('Акція до') : t('Знижка до')} ${moment(
      item.end,
    )
      .format('LL')
      .slice(0, -2)}`;
  }, [item.end, item.type, t]);

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
      return [styles.title, {marginTop: 0}];
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

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress && onPress(item.id)}
      activeOpacity={1}
      disabled={disabled}>
      <Image
        source={{uri: item?.image_background}}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}></View>
      <View style={styles.leftSideContainer}>
        {item.type !== 'new' ? (
          <Text style={styles.date}>{promoEndDate}</Text>
        ) : null}
        {item.title ? (
          <Text style={titleStyles} numberOfLines={2} ellipsizeMode="tail">
            {item.type === 'discount'
              ? `${t('Знижка')} -${item.discount_percentage}%`
              : item.title}
          </Text>
        ) : null}
        {item.type !== 'action' && item.description ? (
          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.description}
          </Text>
        ) : null}
        {item.type === 'action' ? (
          <View style={styles.priceContainer}>
            {prices.new ? (
              <Text style={styles.priceNew}>{`${prices.new} ${t('грн')}`}</Text>
            ) : null}
            {prices.old ? (
              <Text style={styles.priceOld}>{`${prices.old} ${t('грн')}`}</Text>
            ) : null}
          </View>
        ) : null}
        {!disabled ? (
          <TouchableOpacity onPress={onPress && onPress(item.id)}>
            <Text style={styles.link}>{`${t('Дізнатись більше')}`}...</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {/* {item.image ? (
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.image}}
            style={styles.image}
            resizeMode={'cover'}
          />
        </View>
      ) : null} */}
    </TouchableOpacity>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  language: state.appGlobalState.lang,
});

export default connect(mapStateToProps)(PromotionView);
