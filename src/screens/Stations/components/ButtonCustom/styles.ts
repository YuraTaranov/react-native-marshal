import {StyleSheet} from 'react-native';
import {isIphoneX, ios} from '@constants';

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
});
