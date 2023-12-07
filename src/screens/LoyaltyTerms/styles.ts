import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 20,
    color: colors.black_1B1B1B,
  },
  description: {
    marginTop: 8,
    color: colors.gray_6D6F79,
  },
  content: {
    fontSize: 16,
    color: colors.gray_2D2D2D,
    marginTop: 16,
  },
});
