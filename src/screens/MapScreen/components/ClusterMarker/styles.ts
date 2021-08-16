import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

const Size = 54;
const miniSize = Size - 4;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.green_41BB4E,
    width: Size,
    height: Size,
    borderRadius: Size / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: colors.green_41BB4E,
    width: miniSize,
    height: miniSize,
    borderRadius: miniSize / 2,
    borderColor: colors.white_FFFFFF,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white_FFFFFF,
    fontSize: 18,
    fontFamily: fonts.interExtraBold_800,
  },
});
