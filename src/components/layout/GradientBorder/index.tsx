import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import {LinearGradient} from '@components';

import styles from './styles';

type TProps = {
  colors?: string[];
  style?: StyleProp<ViewStyle>;
};

const gradientColors = [
  'rgba(179, 86, 86, 0.4)',
  'rgba(179, 86, 86, 1)',
  'rgba(179, 86, 86, 0.4)',
];

const GradientBorder: React.FC<TProps> = ({
  colors = gradientColors,
  style = {},
}) => {
  return (
    <LinearGradient
      style={[styles.gradientBorder, style]}
      colors={colors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      locations={[0, 0.5, 1]}
    />
  );
};

export default GradientBorder;
