import { StyleSheet } from 'react-native';
import { colors, fonts } from '@constants';

export default StyleSheet.create({
  container: {
    width: 22,
    height: 22,
    borderRadius: 22,
    backgroundColor: colors.green_41BB4E,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: fonts.interBold_700,
    fontSize: 18,
    color: colors.white_FFFFFF
  }
});
