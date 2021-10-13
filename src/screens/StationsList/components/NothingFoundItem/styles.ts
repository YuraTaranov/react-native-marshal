import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    overflow: 'visible',
    paddingTop: 48,
  },
  image: {
    height: 208,
    width: 208,
  },
  text: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 18,
    color: colors.gray_8D909D,
    marginTop: 32,
  },
});
