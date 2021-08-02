import {StyleSheet} from 'react-native';
import {colors, fonts, ios} from '@constants';

export default StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 22,
    backgroundColor: colors.green_41BB4E,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.interBold_700,
    fontSize: 16,
    color: colors.white_FFFFFF,
  },
});
