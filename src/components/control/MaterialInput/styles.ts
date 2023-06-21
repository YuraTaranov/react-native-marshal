import {StyleSheet} from 'react-native';
import {colors, fonts, android} from '@constants';

export default StyleSheet.create({
  inputContainerStyle: {
    alignItems: 'center',
    paddingLeft: 0,
    backgroundColor: colors.white_FFFFFF,
    paddingBottom: 0,
  },
  accessoryContainer: {
    zIndex: 2,
  },
  accessory: {},
  lableStyle: {
    top: 8,
  },
  textInputStyle: {
    fontSize: 16,
    fontFamily: fonts.interRegular_400,
    color: colors.black_000000,
    paddingTop: android ? 2 : 0,
    textTransform: 'uppercase',
  },
});
