import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 60,
    padding: 20,
    overflow: 'visible',
  },
  text: {
    fontFamily: fonts.interMedium_500,
    fontSize: 16,
    color: colors.black_1E1A1A,
  },
});
