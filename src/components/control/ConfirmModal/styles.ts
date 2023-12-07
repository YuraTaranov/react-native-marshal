import {StyleSheet} from 'react-native';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    height: 198,
    backgroundColor: colors.white_FFFFFF,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonStyle: {
    // width: width / 2 - 40,
    width: '49%',
  },
  confirm: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 18,
    color: colors.black_1B1B1B,
  },
  title: {
    color: colors.black_1B1B1B,
    fontFamily: fonts.interMedium_500,
  },
});
