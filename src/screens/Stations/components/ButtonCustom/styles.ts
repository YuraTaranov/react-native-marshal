import {StyleSheet} from 'react-native';
import {isIphoneX, ios, colors} from '@constants';

const size = 10;

export default StyleSheet.create({
  buttonFilter: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    top: isIphoneX ? 46 : ios ? 23 : 2,
  },
  showFilters: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: colors.green_27A74C,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
