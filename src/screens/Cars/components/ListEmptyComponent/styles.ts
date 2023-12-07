import {StyleSheet} from 'react-native';
import {colors, fonts, width, bottom} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: 208,
    width: 208,
    alignSelf: 'center',
  },
  title: {
    marginTop: 32,
    color: colors.black_1B1B1B,
    fontFamily: fonts.interSemiBold_600,
    fontSize: 20,
  },
  description: {
    marginTop: 8,
    color: colors.gray_2D2D2D,
    fontSize: 16,
  },
  buttonBlock: {
    width: width - 32,
    marginBottom: bottom,
  },
});
