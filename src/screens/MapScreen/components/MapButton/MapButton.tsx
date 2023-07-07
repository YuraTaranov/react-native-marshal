import React from 'react';

import {TouchableOpacity, Image} from '@components';
import {colors} from '@constants';
import {assets} from '@assets';

import styles from './styles';

type _t_buttonParams = {
  onPress: () => void;
  green?: boolean;
  name?: string;
  disabled?: boolean;
};

const blackIcon = colors.black_000000;
const whileIcon = colors.white_FFFFFF;

export const MapButton: React.FC<_t_buttonParams> = ({
  onPress,
  name = 'plus',
  green,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      key={`${name}_${disabled}`}
      onPress={onPress}
      style={[styles.container, !!disabled && styles.disabled]}>
      <Image source={assets.MAP_ICON_LOCATION} style={styles.iamge} />
    </TouchableOpacity>
  );
};
