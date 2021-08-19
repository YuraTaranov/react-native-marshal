import React from 'react';
import {useCallback} from '@hooks';
import {View, Text, Icon, TouchableOpacity} from '@components';
import {SVG_Icons} from '@assets';
import styles from './styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TCreditCard} from '@types';
import {colors} from '@constants';
type TProps = {
  cardData: TCreditCard;
  onSelected: () => void;
};

export const CardItem: React.FC<TProps> = ({cardData, onSelected}) => {
  const formatCardNumber = useCallback((): string => {
    if (!cardData?.number) {
      return '';
    }
    return cardData.number
      .replace(/\D/, '')
      .replace(/(\d{4})(\d{2})\d{6}(\d{4})/, '$1 $2** **** $3');
  }, [cardData.number]);

  return (
    <TouchableOpacity style={styles.container} onPress={onSelected}>
      <View style={styles.cardIconView}>
        <SVG_Icons height={24} name="creditcard" />
      </View>
      <View style={styles.cardNumberView}>
        <Text style={styles.cardNumberText}>{formatCardNumber()}</Text>
      </View>
      <View style={styles.checkIconView}>
        <Icon
          size={26}
          name="check_active"
          color={cardData?.selected ? colors.green_41BB4E : colors.gray_DADBDF}
        />
      </View>
    </TouchableOpacity>
  );
};
