import {colors, fonts, ios} from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingTop: ios ? 7 : 4,
    width: 70,
    alignContent: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 0,
  },
  iconView: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconView: {
    marginTop: 6,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  predefinedPlacesDescription: {},
  textInputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderBottomColor: colors.gray_8D909D,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    paddingRight: 77,
  },
  textInput: {
    height: 44,
    flex: 1,
    marginLeft: -10,
    fontFamily: fonts.interRegular_400,
    fontSize: 17,
    lineHeight: 26,
    backgroundColor: 'transparent',
  },
  poweredContainer: {},
  powered: {},
  listView: {},
  row: {
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.gray_8D909D,
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
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
