import React from 'react';
import {View, Text} from '../..';

import styles from './styles';
import {animation} from '@helpers';

type TPros = {
  onPress: () => void;
  onClear: () => void;
  showMyPositionButton: boolean;
  showMyClearButton: boolean;
};

const Label = ({title}) => {
  animation('ios');
  return (
    <View style={styles.label}>
      <Text style={styles.labelText}>{title}</Text>
    </View>
  );
};

export default Label;
