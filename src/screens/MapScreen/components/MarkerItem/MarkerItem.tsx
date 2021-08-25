import React from 'react';
import {View, Image} from '@components';
import styles from './styles';
import {assets} from '@assets';

type TProps = {
  selected: boolean;
};

export const MarkerItem: React.FC<TProps> = ({selected}) => (
  <View style={styles.container}>
    <Image
      style={[styles.marker, selected && styles.selectedMarker]}
      source={assets.MARKER}
    />
  </View>
);
