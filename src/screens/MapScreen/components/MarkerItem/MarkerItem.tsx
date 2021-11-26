import React from 'react';
import {View} from '@components';
import styles from './styles';
import {SVG_Icons as SVG} from '@assets';

type TProps = {
  selected: boolean;
};

export const MarkerItem: React.FC<TProps> = ({selected}) => (
  <View style={styles.container}>
    <SVG name="marker" width={selected ? 55 : 45} />
  </View>
);
