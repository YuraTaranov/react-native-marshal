import {StyleSheet} from 'react-native';

import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white_FFFFFF,
    height: 240,
    padding: 16,
    marginBottom: 48,
  },
  card: {
    width: width - 32,
    height: 230,
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
    width: '100%',
    height: 80,
    position: 'absolute',
    alignItems: 'center',
    paddingTop: 30,
    top: 0,
  },
  logo: {
    width: width / 1.5,
    height: 50,
  },
  frontCard: {
    position: 'absolute',
  },
  backCard: {
    position: 'absolute',
    backgroundColor: colors.gray_E9EAEB,
  },
  bonusCardNumber: {
    textTransform: 'uppercase',
    color: colors.black_343434,
  },
  qrCodeContainer: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    marginTop: 12,
  },
  nameContainer: {
    flex: 1,
    marginTop: 96,
    justifyContent: 'flex-end',
  },
  cardNumberContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  name: {
    color: colors.white_FFFFFF,
    fontSize: 18,
    fontFamily: fonts.interRegular_400,
    textTransform: 'uppercase',
  },
  cardNunber: {
    color: colors.white_FFFFFF,
    fontSize: 16,
    fontFamily: fonts.interRegular_400,
    textTransform: 'uppercase',
  },
});
