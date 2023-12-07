import {StyleSheet} from '@components';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    marginTop: 32,
    height: 191,
  },
  contentContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: colors.black_1B1B1B,
    fontFamily: fonts.interSemiBold_600,
    marginBottom: 24,
  },
  buttonContainer: {
    width: width - 32,
    marginLeft: 16,
    marginBottom: 16,
  },
});
