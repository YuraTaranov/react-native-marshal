import {StyleSheet} from '@components';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green_009F30,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 270,
    height: 228,
  },
  whiteLine: {
    height: 44,
    backgroundColor: colors.white_FFFFFF,
  },
  redLine: {
    height: 44,
    backgroundColor: colors.red_E30016,
  },
  noInternetContainer: {
	flex: 1, 
	justifyContent: 'center', 
	alignItems: 'center'
  },
  noInternetTitle: {
	textAlign: 'center',
	fontSize: 32,
	fontFamily: fonts.interSemiBold_600,
	color: colors.white_FFFFFF,
  },
  noInternetImage: {
	height: 258,
	width: width - 32,
	marginTop: 24,
  },
  noInternetDescription: {
	marginTop: 32,
	textAlign: 'center',
	fontSize: 20,
	fontFamily: fonts.interMedium_500,
	color: colors.white_FFFFFF,
  },
});
