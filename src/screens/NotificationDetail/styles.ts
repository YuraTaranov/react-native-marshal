import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingTop: 24,
    paddingBottom: 48,
  },
  timeDateText: {
    fontSize: 12,
    fontFamily: fonts.interRegular_400,
    color: colors.gray_888A8E,
    marginBottom: 24,
  },
  title: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 20,
    marginBottom: 4,
  },
  message: {
    paddingHorizontal: 4,
    color: colors.gray_2D2D2D,
    marginBottom: 24,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});
