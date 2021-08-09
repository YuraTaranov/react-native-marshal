import React from 'react';
import {TouchableOpacity, Icon} from '@components';
import styles from './styles';
import {colors} from '@constants';

type _t_buttonParams = {
  onPress: () => void;
};

const ButtonCustom: React.FC<_t_buttonParams> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonFilter}>
      <Icon name="filter" color={colors.black_1E1A1A} size={24} />
    </TouchableOpacity>
  );
};

export default ButtonCustom;
