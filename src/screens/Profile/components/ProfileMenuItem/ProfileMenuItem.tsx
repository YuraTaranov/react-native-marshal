import React from 'react';
import {useMemo} from '@hooks';
import {View, Text, TouchableOpacity, Icon} from '@components';
import styles from './styles';
import {colors} from '@constants';

type TProps = {
  item: {
    icon: string;
    name: string;
    onPress: () => void;
  };
  newNotificationsLength: string;
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
    if (item.icon === 'bell') {
      return (
        <Text style={styles.notificationsText}>{newNotificationsLength}</Text>
      );
    }
  }, [item.icon, newNotificationsLength]);

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={item.onPress}>
        <Icon name={item.icon} color={colors.black_1E1A1A} size={24} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          {additionalText}
        </View>
        <Icon name="right" color={colors.black_1E1A1A} size={24} />
      </TouchableOpacity>
    </>
  );
};

export default ProfileMenuItem;
