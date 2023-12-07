import {StyleSheet} from 'react-native';
import {isIphoneX, colors} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_FFFFFF,
    paddingBottom: isIphoneX ? 20 : 5,
  },
  headerView: {
    flex: 0,
    backgroundColor: colors.green_27A74C,
  },
});
