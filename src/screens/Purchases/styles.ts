import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 32,
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemContainer: {
    paddingVertical: 16,
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: colors.black_1B1B1B,
    fontSize: 16,
    fontFamily: fonts.interSemiBold_600,
  },
  itemDate: {
    color: colors.gray_6D6F79,
    fontSize: 16,
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
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white_FFFFFF,
    paddingLeft: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
