import { StyleSheet } from 'react-native';
import { colors, fonts } from '@constants';
import { verticalScale } from '@helpers';

export default StyleSheet.create({
  container: {
    borderRadius: verticalScale(6),
    paddingVertical: verticalScale(19),
    borderWidth: verticalScale(2),
    borderColor: colors.gray_404353,
    alignItems: 'center'
  },
  contentContainer: {
    height: verticalScale(16),
    flexDirection: 'row'
  },
  title: {
    fontSize: verticalScale(14),
    lineHeight: verticalScale(16),
    color: colors.black_000000,
    fontFamily: fonts.interMedium_500,
  },
});
