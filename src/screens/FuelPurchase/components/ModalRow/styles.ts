import {StyleSheet} from 'react-native';
import {colors, fonts, width, padding, isIphoneX} from '@constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    borderTopColor: colors.gray_E1E1E8,
    borderTopWidth: 1,
  },
  iconView: {
    width: 50,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconImage: {
    width: 30,
    height: 30,
    overflow: 'visible',
  },
  textView: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    color: colors.black_1B1B1B,
    fontFamily: fonts.interMedium_500,
  },
  confirm: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 18,
    color: colors.black_1B1B1B,
  },
});
