import {StyleSheet} from '@components';
import {colors, width, ios, isIphoneX} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_FFFFFF,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 0,
    margin: 0,
    paddingLeft: 20,
  },
  addressView: {
    width: '100%',
  },
  addressText: {

  },
  buttonView: {
    width,
    paddingHorizontal: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: isIphoneX ? 52 : ios ? 30 : 30,
  }
});
