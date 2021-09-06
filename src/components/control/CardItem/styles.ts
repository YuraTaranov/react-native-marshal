import {StyleSheet} from 'react-native';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 0,
    paddingHorizontal: 16,
    margin: 0,
    height: 56,
    width,
    alignItems: 'center',
    borderBottomColor: colors.gray_E1E1E8,
    borderBottomWidth: 1,
  },
  cardNumberView: {
    flex: 1,
    marginLeft: 16,
  },
  cardNumberText: {
    fontFamily: fonts.interRegular_400,
    fontSize: 16,
    color: colors.black_000000,
  },
});
