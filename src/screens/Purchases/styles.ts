import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_F9F9F9,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  flatList: {
    paddingBottom: 32,
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.white_FFFFFF,
  },
  itemName: {
    color: colors.black_1B1B1B,
    fontSize: 16,
    fontFamily: fonts.interSemiBold_600,
  },
  itemTitle: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 16,
    color: colors.black_1B1B1B,
  },
  itemPrice: {
    color: colors.red_9A1B18,
    fontSize: 16,
    fontFamily: fonts.interSemiBold_600,
  },
  itemCard: {
    fontFamily: fonts.interMedium_500,
    color: colors.gray_6D6F79,
    marginTop: 4,
    textAlign: 'right',
  },
  activityIndicatorContainer: {
    paddingTop: 32,
    paddingBottom: 32,
  },
  headerContainer: {
    backgroundColor: colors.gray_F9F9F9,
    alignItems: 'center',
  },
  headerTitle: {
    marginTop: 32,
    marginBottom: 12,
  },
  itemSeparator: {
    backgroundColor: colors.gray_E1E1E8,
    height: 1,
    width: '100%',
  },
  bonusesContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  redeemContainer: {
    backgroundColor: colors.gray_EEE,
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 4,
  },
  redeem: {
    color: colors.gray_727272,
    fontSize: 11,
    fontFamily: fonts.interRegular_400,
    lineHeight: 20,
    textTransform: 'lowercase',
  },
  issuanceContainer: {
    backgroundColor: colors.green_C3F8CF,
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 4,
  },
  issuance: {
    color: colors.green_289E42,
    fontSize: 11,
    fontFamily: fonts.interRegular_400,
    lineHeight: 20,
    textTransform: 'lowercase',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: colors.gray_989898,
    fontSize: 11,
    fontFamily: fonts.interRegular_400,
  },
  discount: {
    color: colors.gray_6D6F79,
    fontSize: 13,
    fontFamily: fonts.interRegular_400,
    marginTop: 4,
  },
  itemContentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPriceContainer: {
    alignItems: 'flex-end',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
