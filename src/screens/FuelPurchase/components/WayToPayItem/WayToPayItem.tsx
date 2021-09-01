import React from 'react';
import {useTranslation, useState, useRef} from '@hooks';
import {TouchableOpacity, Text, View, Icon} from '@components';
import {colors} from '@constants';
import styles from './styles';

type TProps = {
  onPress: () => void;
  isVisible: boolean;
};

export const WayToPayItem: React.FC<TProps> = ({onPress, isVisible}) => {
  const {t} = useTranslation();

  const Ref = useRef();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>{t('PaymentMethod')}</Text>
        </View>
        <View style={styles.iconView}>
          <Icon
            name={isVisible ? 'arrow-down' : 'right'}
            color={colors.black_1E1A1A}
            size={24}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
