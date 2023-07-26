import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_F9F9F9,
    paddingBottom: 32,
    paddingTop: 16,
  },
  itemBlockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    backgroundColor: colors.white_FFFFFF,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  separator: {
    backgroundColor: colors.gray_E1E1E8,
    height: 1,
    width: '100%',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {},
  itemTitle: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 16,
  },
  footerDescription: {
    color: colors.gray_595959,
    fontSize: 11,
    fontFamily: fonts.interRegular_400,
    marginBottom: 4,
    lineHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContact: {
    marginLeft: 9,
    fontSize: 11,
    fontFamily: fonts.interRegular_400,
    color: colors.black_000000,
    textTransform: 'uppercase',
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
  discount: {
    color: colors.gray_6D6F79,
    fontSize: 13,
    fontFamily: fonts.interRegular_400,
  },
  itemPrice: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 15,
    color: colors.gray_595959,
  },
  headerContainer: {
    paddingTop: 32,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  headerDescription: {
    fontFamily: fonts.interRegular_400,
    fontSize: 13,
    color: colors.gray_6D6F79,
  },
  headerTotalPrice: {
    fontFamily: fonts.interBold_700,
    fontSize: 19,
    color: colors.red_9A1B18,
  },
  headerDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  headerPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
