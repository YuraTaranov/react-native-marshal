import React from 'react';
import {useTranslation, useState} from '@hooks';
import {TouchableOpacity, Text, View, Icon} from '@components';
import {colors} from '@constants';
import styles from './styles';
import {TPaySystemContent} from '@types';

type TProps = {
  onPress: () => void;
  isVisible: boolean;
  selectedPayType: TPaySystemContent | null;
};

export const WayToPayItem: React.FC<TProps> = ({
  onPress,
  isVisible,
  selectedPayType,
}) => {
  const {t} = useTranslation();

  //   console.log('selectedPayType', selectedPayType);

  const getTitle = () => {
    if (selectedPayType) {
      const {icon, title} = selectedPayType;
      return icon === 'creditcard'
        ? title.replace(
            /(\d{4}\s+\d{2})\d{2}\s+\d{4}(\s+\d{4})/s,
            '$1** ****$2',
          )
        : title;
    }
    return '';
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {selectedPayType?.title ? (
          <View style={styles.textView}>
            <Text style={styles.textTop}>{t('PaymentMethod')}</Text>
            <Text style={styles.textDown}>{getTitle()}</Text>
          </View>
        ) : (
          <View style={styles.textView}>
            <Text style={styles.text}>{t('PaymentMethod')}</Text>
          </View>
        )}
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
