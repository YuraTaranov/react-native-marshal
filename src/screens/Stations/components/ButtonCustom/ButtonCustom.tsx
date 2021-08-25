import React from 'react';
import {TouchableOpacity, Icon, View} from '@components';
import styles from './styles';
import {colors} from '@constants';

type _t_buttonParams = {
  onPress: () => void;
  isFilterEmpty: boolean;
};

const ButtonCustom: React.FC<_t_buttonParams> = ({onPress, isFilterEmpty}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonFilter}>
      <Icon name="filter" color={colors.black_1E1A1A} size={24} />
      {!isFilterEmpty && <View style={styles.showFilters} />}
    </TouchableOpacity>
  );
};

export default ButtonCustom;
