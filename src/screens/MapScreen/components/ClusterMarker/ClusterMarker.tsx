import React from 'react';
import {View, Text} from '@components';
import styles from './styles';

type TProps = {
  counter: number;
};

export const ClusterMarker: React.FC<TProps> = ({counter}) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.text}>{counter}</Text>
      </View>
    </View>
  );
};
