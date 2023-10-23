import {StyleSheet} from 'react-native';

import {colors, fonts, sizes} from '@constants';
const STEP = sizes.window_width / 10;

const IMAGE_WIDTH = STEP * 5.5;
// const IMAGE_HEIGHT = STEP * 4.6;
const TITLE_WIDTH = STEP * 8;
const DESCRIPTION_WIDTH = STEP * 7;

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  gradient: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  noInternetContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  noInternetTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fonts.interMedium_500,
    color: colors.white_FFFFFF,
    textTransform: 'uppercase',
    width: TITLE_WIDTH,
  },
  noInternetTitleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  noInternetImage: {
    height: sizes.window_width / 3,
    width: sizes.window_width,
  },
  qrCodeContainer: {
    width: sizes.window_width,
    alignItems: 'center',
  },
  noInternetImageContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  noInternetDescription: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.interMedium_500,
    color: colors.white_FFFFFF,
    textTransform: 'uppercase',
    width: DESCRIPTION_WIDTH,
  },
  noInternetDescriptionContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
