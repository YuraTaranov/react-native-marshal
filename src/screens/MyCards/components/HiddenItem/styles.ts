import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.red_E30016,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    color: colors.white_FFFFFF,
    fontFamily: fonts.interSemiBold_600,
    fontSize: 16,
  },
});
