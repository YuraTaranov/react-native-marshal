import {StyleSheet} from '@components';
import {colors, width, padding, fonts} from '@constants';

export default StyleSheet.create({
  itemPrice: {
    width: width / 2 - padding - 4,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white_FFFFFF,
    borderColor: colors.gray_DADBDF,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
  },
  selected: {
    backgroundColor: colors.green_00AE36,
    borderColor: colors.green_00AE36,
    borderWidth: 1,
  },
  title: {
    fontFamily: fonts.interMedium_500,
    fontSize: 18,
    color: colors.black_000000,
    margin: 4,
  },
  titleSelected: {
    color: colors.white_FFFFFF,
  },
  cost: {
    fontFamily: fonts.interRegular_400,
    fontSize: 16,
    color: colors.black_000000,
    margin: 4,
  },
  costSelected: {
    color: colors.white_FFFFFF,
  },
});
