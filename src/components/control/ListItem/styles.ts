import {StyleSheet} from 'react-native';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.gray_DADBDF,
    borderBottomWidth: 1.75,
    paddingHorizontal: 20,
  },
  textView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: fonts.interRegular_400,
    fontSize: 16,
    color: colors.black_1B1B1B,
  },
  selectedLabelText: {
    color: colors.green_41BB4E,
  },
  iconView: {},
});
