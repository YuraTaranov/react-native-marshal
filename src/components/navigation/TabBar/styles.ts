import {StyleSheet} from 'react-native';
import {colors, ios} from '@constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingTop: 8,
    marginBottom: ios ? 28 : 8,
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
