import {StyleSheet} from '@components';
import {colors, fonts, bottom} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: bottom,
  },
  title: {
    color: colors.black_1B1B1B,
    fontFamily: fonts.interSemiBold_600,
    fontSize: 20,
    marginTop: 24,
  },
  description: {
    marginTop: 8,
    color: colors.gray_2D2D2D,
    fontSize: 16,
  },
  date: {
    marginTop: 24,
    color: colors.gray_6D6F79,
  },
});
