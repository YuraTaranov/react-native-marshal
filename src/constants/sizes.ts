import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const sizes = {
  window_width: width,
  window_height: height,
  cardWidth: width - 32,
  cardHeight: (width - 32) * 0.63,
  rem: width > 375 ? 18 : 16,
  horizontalCoefficient: width / 375,
  verticalCoefficient: height / 812,
  pts_2: 2,
  pts_4: 4,
  pts_6: 6,
  pts_8: 8,
  pts_12: 12,
  pts_14: 14,
  pts_16: 16,
  pts_18: 18,
  pts_20: 20,
  pts_24: 24,
  pts_28: 28,
  pts_32: 32,
  pts_40: 40,
  pts_48: 48,
  pts_56: 56,
  pts_64: 64,
  pts_80: 80,
  pts_100: 100,
  pts_120: 120,
};
