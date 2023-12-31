import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  tabBarLabelStyle: {
    fontFamily: fonts.interMedium_500,
    textTransform: 'uppercase',
    fontSize: 18,
  },
  whiteFond: {
    backgroundColor: colors.white_FFFFFF,
    // backgroundColor: colors.red_9A1B18,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.red_CA001A,
    height: 2,
  },
  barTitle: {
    marginRight: 50,
    shadowColor: colors.white_FFFFFF,
    elevation: 0,
  },
});
