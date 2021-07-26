import { colors, fonts, sizes } from '@constants';
import { StyleSheet } from '@components';
import { verticalScale } from '@helpers';

export default StyleSheet.create({
  container: {
    paddingBottom: verticalScale(24),
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  dotView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    marginHorizontal: 4,
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: colors.gray_E1E1E8
  },
  snapCarousel: {
    width: '100%',
  },
  activeDot: {
    marginHorizontal: 4,
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: colors.black_000000,
  },
  usualButtonView: {
    width: '100%',
    paddingHorizontal: 16
    // marginBottom: verticalScale(70),
  },
  dotsView: {
    marginBottom: verticalScale(60),
    flexDirection: 'row',
  },
});
