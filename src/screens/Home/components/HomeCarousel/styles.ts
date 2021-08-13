import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export default StyleSheet.create({
  container: {
    marginTop: 24,
  },
  itemContainer: {
    marginRight: 8,
  },
  dotsContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 30,
    backgroundColor: colors.black_000000,
  },
  dotsStyleInactive: {
    marginHorizontal: 0,
    width: 8,
    height: 8,
    backgroundColor: colors.gray_E1E1E8,
  },
});
