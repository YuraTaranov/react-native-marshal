import React from 'react';
import {View, Text, Icon, TouchableOpacity} from '@components';
import {colors} from '@constants';
import styles from './styles';

type TProps = {
  iconName: string;
  label: string;
  onPress: Function;
  black?: boolean;
};

export const MarkerButton: React.FC<TProps> = ({
  iconName,
  label,
  onPress,
  black,
}) => (
  <TouchableOpacity onPress={() => onPress()} style={styles.main}>
    <View style={[styles.container, black && styles.blackFond]}>
      <View style={styles.left}>
        <Icon
          name={iconName}
          size={28}
          color={black ? colors.white_FFFFFF : colors.black_1E1A1A}
        />
      </View>
      <View style={styles.right}>
        <Text style={[styles.text, black && styles.black]}>{label}</Text>
      </View>
    </View>
  </TouchableOpacity>
);
