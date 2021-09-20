import React from 'react';
import {TouchableOpacity, Platform} from '@components';
import {SVG_Icons} from '@assets';
import styles from './styles';
import {colors} from '@constants';

type TProps = {
  onPress: Function;
};

export const LeftButton: React.FC<TProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      {/* <Icon name="back" size={24} color={colors.white_FFFFFF} /> */}
      <SVG_Icons
        name={Platform.OS === 'ios' ? 'iosToBack' : 'androidToBack'}
        fill={colors.white_FFFFFF}
        width={22}
      />
    </TouchableOpacity>
  );
};
