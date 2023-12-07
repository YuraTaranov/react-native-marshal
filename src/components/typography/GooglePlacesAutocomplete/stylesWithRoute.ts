import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_FFFFFF,
  },
  buttonContainer: {
    overflow: 'visible',
  },
  leftIconView: {
    marginTop: 6,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 44,
    flex: 1,
    marginLeft: -10,
    marginTop: 4,
    fontFamily: fonts.interRegular_400,
    fontSize: 17,
    backgroundColor: '#0000',
    color: colors.black_000000,
  },
  row: {
    height: 44,
    flexDirection: 'row',
  },
  label: {
    position: 'absolute',
    top: -7,
    left: 0,
  },
  labelText: {
    fontFamily: fonts.interRegular_400,
    fontSize: 12,
    color: colors.gray_6D6F79,

  },
});
