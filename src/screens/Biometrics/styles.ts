import {StyleSheet} from '@components';
import {colors, bottom, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: bottom,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.interMedium_500,
    fontSize: 18,
    color: colors.black_1B1B1B,
  },
  image: {
    height: 190,
    width: 160,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginBottom: 16,
  },
});
