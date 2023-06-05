import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingBottom: 8,
  },
  eachScreen: {
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.black_58585B,
  },
  textActive: {
    color: colors.red_D61920,
  },
});
