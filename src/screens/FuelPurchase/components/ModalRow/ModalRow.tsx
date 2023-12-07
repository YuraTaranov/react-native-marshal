import React from 'react';
import {useTranslation} from '@hooks';
import {Icon, Text, TouchableOpacity, View, Image} from '@components';
import styles from './styles';
import {colors, hitSlop} from '@constants';
import {SVG_Icons, assets} from '@assets';

type TProps = {
  onSelected: () => void;
  title: string;
  icon: string;
  selected?: boolean;
};

export const ModalRow: React.FC<TProps> = ({
  onSelected,
  title,
  icon,
  selected,
}) => {
  const Title = title;

    // icon === 'creditcard'
    //   ? title.replace(/(\d{4}\s+\d{2})\d{2}\s+\d{4}(\s+\d{4})/s, '$1** ****$2')
    //   : title;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onSelected}
      hitSlop={hitSlop}>
      {icon === 'googlePay' ? (
        <View style={styles.iconView}>
          <Image
            source={assets.GOOGLE_PAY}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </View>
      ) : icon === 'creditcard' ? (
        <View style={styles.iconView}>
          <SVG_Icons height={24} name="creditcard" fill={colors.black_1B1B1B} />
        </View>
      ) : (
        <View style={styles.iconView}>
          <Icon size={26} name={icon} color={colors.black_1B1B1B} />
        </View>
      )}
      <View style={styles.textView}>
        <Text style={styles.title}>{Title}</Text>
      </View>
      {selected && icon !== 'plus' && (
        <View style={styles.iconView}>
          <Icon size={26} name="check_active" color={colors.green_00AE36} />
        </View>
      )}
    </TouchableOpacity>
  );
};
//.replace( /(\d{4}\s+\d{2})\d{2}\s+\d{4}(\s+\d{4})/s, '$1** ****$2',),
