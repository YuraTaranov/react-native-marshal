import React from 'react';
import {colors} from '@constants';
import {TouchableOpacity, View} from '../..';
import {SVG_Icons} from '@assets';

import stylesWithRoute from './stylesWithRoute';

type TPros = {
  onPress: () => void;
  showMyPositionButton: boolean;
};

const LeftMyButton: React.FC<TPros> = ({onPress, showMyPositionButton}) => {
  if (!showMyPositionButton) {
    return null;
  }
  return (
    <TouchableOpacity onPress={onPress} style={stylesWithRoute.buttonContainer}>
      <View style={stylesWithRoute.leftIconView}>
        <SVG_Icons height={21} fill={colors.green_00AE36} name="point" />
      </View>
    </TouchableOpacity>
  );
};

export default LeftMyButton;
