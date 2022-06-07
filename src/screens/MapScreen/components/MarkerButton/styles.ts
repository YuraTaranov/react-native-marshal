import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    borderColor: colors.black_000000,
    borderRadius: 5,
    borderWidth: 1.5,
    height: 60,
    flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
    backgroundColor: colors.white_FFFFFF,
  },
  blackFond: {
    backgroundColor: colors.black_000000,
  },
  black: {
    color: colors.white_FFFFFF,
    fontFamily: fonts.interSemiBold_600,
  },
  left: {
    paddingRight: 8,
  },
  right: {
  },
  text: {
    fontFamily: fonts.interMedium_500,
    fontSize: 16,
  },
});
