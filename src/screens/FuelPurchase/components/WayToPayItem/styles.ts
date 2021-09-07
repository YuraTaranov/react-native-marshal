import {StyleSheet} from 'react-native';
import {colors, fonts, width, padding} from '@constants';

const WRow = width - padding * 2;
const WIcon = 150;
const WText = WRow - WIcon;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: WRow,
    height: 50,
    borderBottomColor: colors.gray_E1E1E8,
    borderBottomWidth: 2,
    justifyContent: 'space-between',
  },
  textView: {
    width: WText,
    justifyContent: 'center',
  },
  iconView: {
    width: WIcon,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    color: colors.gray_8D909D,
    fontSize: 16,
    fontFamily: fonts.interRegular_400,
  },
  textTop: {
    color: colors.gray_8D909D,
    fontSize: 12,
    fontFamily: fonts.interRegular_400,
  },
  textDown: {
    color: colors.black_000000,
    fontSize: 16,
    fontFamily: fonts.interRegular_400,
    marginVertical: 5,
  },
});
