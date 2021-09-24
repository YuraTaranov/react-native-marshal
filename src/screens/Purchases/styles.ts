import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
  },
  flatList: {},
  itemContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.gray_E1E1E8,
  },
  itemName: {
    color: colors.black_1B1B1B,
    fontSize: 16,
    fontFamily: fonts.interSemiBold_600,
  },
  itemDate: {
    color: colors.gray_6D6F79,
    fontSize: 13,
    marginTop: 4,
  },
  itemPrice: {
    color: colors.black_1B1B1B,
    fontSize: 16,
    fontFamily: fonts.interMedium_500,
  },
  itemCard: {
    fontFamily: fonts.interMedium_500,
    color: colors.gray_6D6F79,
    marginTop: 4,
    textAlign: 'right',
  },
  activityIndicatorContainer: {
    marginTop: 8,
  },
});
