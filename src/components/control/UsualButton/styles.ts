import { StyleSheet } from 'react-native';
import { colors, fonts } from '@constants';
import { verticalScale } from '@helpers';

export default StyleSheet.create({
  container: {
    borderRadius: verticalScale(6),
  },
  title: {
    color: colors.white_FFFFFF,
    fontFamily: fonts.interMedium_500,
    fontSize: verticalScale(14),
    lineHeight: verticalScale(16)
  },
  contentContainer: {
    height: verticalScale(16)
  },
  btnStyle: {
    paddingVertical: verticalScale(19),
    width: '100%',
    alignItems: 'center'
  }
});
