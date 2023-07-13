import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  title: {
    fontSize: 12,
    marginTop: 8,
    color: colors.black_58585B,
    fontFamily: fonts.interRegular_400,
  },
  titleActive: {
    color: colors.red_D61920,
  },
});
