import React from 'react';
import {LinearGradient} from '@components';
import styles from './styles';

type TProps = {
  colors?: string[];
};

const gradientColors = [
  'rgba(179, 86, 86, 0.4)',
  'rgba(179, 86, 86, 1)',
  'rgba(179, 86, 86, 0.4)',
];

const GradientBorder: React.FC<TProps> = ({colors = gradientColors}) => {
  return (
    <LinearGradient
      style={[styles.gradientBorder]}
      colors={colors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      locations={[0, 0.5, 1]}
    />
  );
};

export default GradientBorder;
