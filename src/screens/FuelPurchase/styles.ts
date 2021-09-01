import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  whiteFond: {
    height: 53,
    backgroundColor: colors.white_FFFFFF,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.green_00AE36,
    height: 2.5,
  },
  barTitle: {
    shadowColor: colors.white_FFFFFF,
  },
  tabBarLabelStyle: {
    marginTop: 10,
    textTransform: 'capitalize',
    fontSize: 16,
    fontFamily: fonts.interMedium_500,
  },
});
