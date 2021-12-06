import React from 'react';
import {TouchableOpacity, Icon} from '@components';
import {colors} from '@constants';
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
      style={[
        styles.container,
        !!green && styles.green,
        !!disabled && styles.disabled,
      ]}>
      <Icon
        name={name}
        size={green ? 26 : 20}
        color={green ? whileIcon : blackIcon}
      />
    </TouchableOpacity>
  );
};
