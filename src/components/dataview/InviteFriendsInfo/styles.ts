import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumberContainerOuter: {
    height: 32,
    width: 32,
    borderRadius: 50,
    backgroundColor: colors.green_00AE36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberContainerInner: {
    height: 30,
    width: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.green_EBFCF0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberValue: {
    color: colors.white_FFFFFF,
    fontFamily: fonts.interMedium_500,
  },
  stepText: {
    marginLeft: 16,
    color: colors.gray_2D2D2D,
    fontSize: 16,
    fontFamily: fonts.interSemiBold_600,
  },
});
