import {StyleSheet} from 'react-native';

import {colors, fonts, sizes, width} from '@constants';

export default StyleSheet.create({
  container: {
    height: 240,
    padding: 16,
  },
  cardMainContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  card: {
    width: width - 32,
    height: 230,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: colors.white_FFFFFF,
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
  logoContainer: {
    width: width / 1.5,
    height: 50,
    marginBottom: -25,
    marginTop: 30,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  bonusContainer: {
    width: width - 88,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gradientBorder: {
    width: sizes.window_width - 64,
  },
});
