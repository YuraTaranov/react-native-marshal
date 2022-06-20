import React from 'react';
import {Image, View} from '@components';
import styles from './styles';
import {assets, SVG_Icons as SVG} from '@assets';
import {TMarker} from '../../MapScreen';

type TProps = {
  selected: boolean;
  marker: TMarker;
  onLoadEnd?: () => void;
};

export const MarkerItem: React.FC<TProps> = ({selected, marker, onLoadEnd}) => {
  const onLoadEndCb = onLoadEnd ? onLoadEnd : () => {};

  return (
    <View style={styles.container}>
      <View style={styles.markerContainer}>
        <Image
          source={marker?.image ? {uri: marker?.image} : assets.MARKER_LOGO}
          style={styles.image}
          resizeMode="contain"
          onLoadEnd={onLoadEndCb}
        />
      </View>
    </View>
  );
};
