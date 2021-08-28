import React from 'react';
import {colors} from '@constants';
import {TouchableOpacity, View, Icon} from '../..';
import {SVG_Icons} from '@assets';

import styles from './styles';

type TPros = {
  onPress: () => void;
  onClear: () => void;
  showMyPositionButton: boolean;
  showMyClearButton: boolean;
};

const RightMyButton: React.FC<TPros> = ({
  onPress,
  onClear,
  showMyPositionButton,
  showMyClearButton,
}) => (
  <View style={styles.buttonsContainer}>
    <TouchableOpacity onPress={onClear} disabled={!showMyClearButton}>
      <View style={styles.iconView}>
        {showMyClearButton && (
          <Icon size={24} name="x" color={colors.gray_DADBDF} />
        )}
      </View>
    </TouchableOpacity>
    {showMyPositionButton && (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.iconView}>
          <SVG_Icons height={25} fill={colors.black_000000} name="location" />
        </View>
      </TouchableOpacity>
    )}
  </View>
);

export default RightMyButton;
