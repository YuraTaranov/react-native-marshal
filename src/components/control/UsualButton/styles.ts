import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants';
import {verticalScale} from '@helpers';

export default StyleSheet.create({
  container: {
    borderRadius: verticalScale(6),
    height: 54,
    justifyContent: 'center',
  },
  title: {
    color: colors.white_FFFFFF,
    fontFamily: fonts.interMedium_500,
    fontSize: verticalScale(14),
    lineHeight: verticalScale(16),
  },
  btnStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
  },
});
