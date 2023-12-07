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
    height: 54,
    flexDirection: 'row',
    backgroundColor: colors.white_FFFFFF,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blackFond: {
    backgroundColor: colors.black_000000,
  },
  black: {
    color: colors.white_FFFFFF,
    fontFamily: fonts.interSemiBold_600,
  },
  left: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 8,
  },
  right: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.interMedium_500,
    fontSize: 16,
  },
});
