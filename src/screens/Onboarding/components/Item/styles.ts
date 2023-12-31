import {StyleSheet} from 'react-native';
import {colors, fonts, sizes} from '@constants';
import {verticalScale} from '@helpers';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: sizes.window_width,
    flex: 1,
  },
  title: {
    marginBottom: verticalScale(40),
    textAlign: 'center',
    fontFamily: fonts.interSemiBold_600,
    fontSize: verticalScale(20),
    color: colors.black_1B1B1B,
  },
  titleContainer: {
    justifyContent: 'center',
  },
});
