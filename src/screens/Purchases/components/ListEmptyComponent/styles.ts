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
    color: colors.gray_8D909D,
    fontFamily: fonts.interSemiBold_600,
    fontSize: 18,
    textAlign: 'center',
  },
});
