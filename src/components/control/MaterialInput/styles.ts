import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  inputContainerStyle: {
    alignItems: 'center',
    paddingLeft: 0,
    backgroundColor: colors.white_FFFFFF,
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
  },
});
