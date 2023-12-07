import React from 'react';

import {useMemo} from '@hooks';
import {View, Text, TouchableOpacity, GradientBorder} from '@components';
import {gradients} from '@constants';

import styles from './styles';

type TProps = {
  item: {
    icon: string;
    name: string;
    onPress: () => void;
  };
  newNotificationsLength: string | null;
  cardNumber: string;
};

const ProfileMenuItem: React.FC<TProps> = ({
  item,
  newNotificationsLength,
  cardNumber,
}) => {
  const additionalText = useMemo(() => {
    if (item.icon === 'creditcard') {
      return <Text style={styles.bonusCardNumber}>{cardNumber}</Text>;
    }
    if (item.icon === 'bell' && newNotificationsLength) {
      return (
        <Text style={styles.notificationsText}>{newNotificationsLength}</Text>
      );
    }
  }, [item.icon, newNotificationsLength, cardNumber]);

  return (
    <TouchableOpacity style={styles.container} onPress={item.onPress}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{item.name}</Text>
        {additionalText}
        <GradientBorder colors={gradients.gray} />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;
