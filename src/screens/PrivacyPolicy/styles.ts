import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingTop: 24,
    paddingBottom: 32,
  },
  description: {
    fontSize: 16,
    color: colors.gray_2D2D2D,
  },
  link: {
    fontFamily: fonts.interBold_700,
    color: colors.black_000000,
    fontSize: 16,
  },
});
