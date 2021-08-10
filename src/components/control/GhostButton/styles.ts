import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants';
import {verticalScale} from '@helpers';

export default StyleSheet.create({
  container: {
    borderRadius: verticalScale(6),
    height: 54,
    borderWidth: verticalScale(2),
    borderColor: colors.gray_404353,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: verticalScale(14),
    lineHeight: verticalScale(16),
    color: colors.black_000000,
    fontFamily: fonts.interMedium_500,
  },
});
