import {StyleSheet} from 'react-native';

import {colors, fonts, sizes} from '@constants';

export default StyleSheet.create({
  container: {
    marginTop: 48,
    marginHorizontal: 16,
  },
  contentContainer: {
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockContainer: {
    width: (sizes.window_width - 32) / 2 - 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockTitle: {
    marginLeft: 16,
    fontFamily: fonts.interMedium_500,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  blockValueContainer: {
    flex: 1,
    alignItems: 'center',
  },
  blockValue: {
    fontSize: 16,
    fontFamily: fonts.interSemiBold_600,
    color: colors.black_1B1B1B,
  },
  gradientSeparate: {
    height: 46,
    width: 1,
  },
  gradientBorder: {
    width: sizes.window_width - 32,
  },
});
