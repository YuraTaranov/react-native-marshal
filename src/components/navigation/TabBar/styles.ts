import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  eachScreen: {
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
  },
  textActive: {
    color: colors.green_00AE36,
  },
});
