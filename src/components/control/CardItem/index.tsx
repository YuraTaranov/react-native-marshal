import React from 'react';
import {View, Text, Icon} from '@components';
import {SVG_Icons} from '@assets';
import styles from './styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TPaymentСard} from '@types';
import {colors} from '@constants';
import {Pressable} from 'react-native';
type TProps = {
  cardData: TPaymentСard;
  onSelected: () => void;
};

export const CardItem: React.FC<TProps> = ({cardData, onSelected}) => {
  if (!cardData?.card) {
    return null;
  }

  return (
    <Pressable style={styles.container} onPress={onSelected}>
      <View>
        <SVG_Icons height={24} name="creditcard" />
      </View>
      <View style={styles.cardNumberView}>
        <Text style={styles.cardNumberText}>{cardData.card}</Text>
      </View>
      <View>
        <Icon
          size={26}
          name="check_active"
          color={cardData?.selected ? colors.green_41BB4E : colors.gray_DADBDF}
        />
      </View>
    </Pressable>
  );
};
