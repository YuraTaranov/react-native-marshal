import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    marginTop: 8,
    color: colors.black_58585B,
    fontFamily: fonts.interRegular_400,
    textTransform: 'uppercase',
  },
  titleActive: {
    color: colors.red_D61920,
  },
});
