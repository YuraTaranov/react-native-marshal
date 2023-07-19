import {StyleSheet} from 'react-native';
import {colors, ios} from '@constants';
import {DeviceInfo} from '@components';

const isPhone14pro = DeviceInfo.getModel() === 'iPhone 14 Pro';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingTop: 12,
    marginBottom: ios ? (isPhone14pro ? 24 : 8) : 8,
  },
  eachScreen: {
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
