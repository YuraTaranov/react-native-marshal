import {StyleSheet} from 'react-native';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
	margin: 0,
	backgroundColor: colors.green_009F30,
	justifyContent: 'center',
	alignItems: 'center'
  },
  text: {
	fontSize: 20,
	color: colors.white_FFFFFF
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