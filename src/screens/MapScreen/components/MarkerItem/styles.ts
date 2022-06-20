import { colors } from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 65,
    width: 55,
    overflow: 'visible',
	alignItems: 'center',
  },
  marker: {
    height: 62,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  selectedMarker: {
    height: 70,
    width: 58,
  },

  markerContainer: {
	height: 54,
	width: 54,
	borderWidth: 1,
	borderColor: colors.white_FFFFFF,
	backgroundColor: colors.green_00AE36,
	borderTopLeftRadius: 50,
	borderTopRightRadius: 50,
	borderBottomLeftRadius: 50,
	borderBottomRightRadius: 0,
	transform: [{rotate: '45deg'}],
	alignItems: 'center',
	justifyContent: 'center',
  },
  image: {
	height: 32,
	width: 32,
	transform: [{rotate: '-45deg'}],
  },
});
