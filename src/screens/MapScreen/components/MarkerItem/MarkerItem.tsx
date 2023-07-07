import React from 'react';
import {Image, View} from '@components';
import styles from './styles';
import {assets} from '@assets';
import {TMarker} from '../../MapScreen';

type TProps = {
  selected: boolean;
  marker: TMarker;
  onLoadEnd?: () => void;
};

export const MarkerItem: React.FC<TProps> = ({selected, marker, onLoadEnd}) => {
  const onLoadEndCb = onLoadEnd ? onLoadEnd : () => {};

  return (
    <Image
      source={assets.MARKER}
      style={styles.container}
      resizeMode="contain"
      onLoadEnd={onLoadEndCb}
    />
  );
};
