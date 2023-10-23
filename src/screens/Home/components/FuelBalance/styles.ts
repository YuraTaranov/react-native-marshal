import {StyleSheet} from 'react-native';
import {colors, fonts, sizes, width} from '@constants';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white_FFFFFF,
    height: 240,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fuelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  fuelTypeContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fuelValueContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fuelTitle: {
    color: colors.white_FFFFFF,
    textTransform: 'uppercase',
    fontSize: 14,
    marginBottom: 8,
  },
  fuelTypeValueContainer: {
    flexDirection: 'row',
  },
  bonusValue: {
    color: colors.white_FFFFFF,
    fontSize: 18,
    fontFamily: fonts.interBold_700,
    textTransform: 'uppercase',
  },
  bonusValueRegular: {
    fontFamily: fonts.interRegular_400,
    marginLeft: 2,
  },
  fuelTypeValue: {
    color: colors.white_FFFFFF,
    fontSize: 16,
    fontFamily: fonts.interBold_700,
    marginRight: 8,
  },
  fuelValue: {
    color: colors.white_FFFFFF,
    fontSize: 16,
    fontFamily: fonts.interBold_700,
    textTransform: 'uppercase',
  },
  fuelValueRegular: {
    fontFamily: fonts.interRegular_400,
  },
  modalContainer: {
    flex: 1,
    margin: 0,
  },
  modalContentContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    height: 330,
    width: width,
    backgroundColor: colors.white_FFFFFF,
    bottom: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.black_1B1B1B,
    fontFamily: fonts.interSemiBold_600,
    fontSize: 18,
    marginBottom: 24,
  },

  // new card
  card: {
    width: sizes.cardWidth,
    height: sizes.cardHeight,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: colors.white_FFFFFF,
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  imageBackgroundContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  flipContainer: {
    width: '100%',
    paddingBottom: 70,
  },
  fingerprintContainer: {
    height: 35,
    width: 35,
    alignSelf: 'flex-end',
    paddingTop: 1,
    paddingRight: 1,
  },
  fingerprint: {
    width: 35,
    height: 35,
  },
  logoContainer: {
    width: width / 1.5,
    height: 50,
    marginBottom: 16,
    position: 'absolute',
    top: 30,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  frontCard: {
    position: 'absolute',
  },
  backCard: {
    position: 'absolute',
    backgroundColor: colors.gray_E9EAEB,
  },
  bonusContainer: {
    width: width - 88,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bonusCardNumber: {
    textTransform: 'uppercase',
    color: colors.black_343434,
  },
  qrCodeContainer: {
    width: sizes.cardHeight / 2,
    height: sizes.cardHeight / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  nameContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    color: colors.white_FFFFFF,
    fontSize: 18,
    fontFamily: fonts.interRegular_400,
    textTransform: 'uppercase',
  },
  cardNumberContainer: {
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  cardNunber: {
    color: colors.white_FFFFFF,
    fontSize: 16,
    fontFamily: fonts.interRegular_400,
    textTransform: 'uppercase',
  },
  gradientBorder: {
    width: sizes.window_width - 64,
  },
  loaderView: {
    position: 'absolute',
    width: sizes.cardHeight / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    height: sizes.cardHeight / 2,
  },
  blurView: {
    position: 'absolute',
    width: sizes.cardHeight / 2,
    height: sizes.cardHeight / 2,
  },
});
