import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    color: colors.black_58585B,
  },
  titleActive: {
    color: colors.red_D61920,
  },
});
