import { colors, fonts, width } from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
container: {
	flex: 1,
	margin: 0,
},
	contentContainer: {
	paddingVertical: 24,
	paddingHorizontal: 16,
	height: 437,
	width: width,
	backgroundColor: colors.white_FFFFFF,
	bottom: 0,
	position: 'absolute',
},
	titleContainer: {
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'flex-end',
},
	title: {
	color: colors.black_1B1B1B,
	fontFamily: fonts.interSemiBold_600,
	fontSize: 20,
	textAlign: 'center',
	marginTop: 24
},
image: {
	height: 230,
	width: '100%',
	marginTop: 24,
}
})