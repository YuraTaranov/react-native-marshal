import {StyleSheet} from 'react-native';
import {colors, width} from '@constants';

export default StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioText: {
    fontSize: 16,
    color: colors.gray_2D2D2D,
    marginLeft: 16,
    width: width - 90,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.gray_2D2D2D,
  },
});
