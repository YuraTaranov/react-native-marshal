import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export default StyleSheet.create({
  container: {
    marginTop: 48,
  },
  dotsContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 30,
    backgroundColor: colors.red_D61920,
  },
  dotsStyleInactive: {
    marginHorizontal: 0,
    width: 6,
    height: 6,
    backgroundColor: colors.gray_E1E1E8,
  },
});
