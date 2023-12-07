import React from 'react';
import {View, Text, TouchableOpacity} from '@components';
import styles from './styles';

type TProps = {
  label: string;
  onPress: () => void;
};

export const FilterButton: React.FC<TProps> = ({label, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.main}>
    <View style={[styles.container, styles.blackFond]}>
      <Text style={[styles.text, styles.black]}>{label}</Text>
    </View>
  </TouchableOpacity>
);
