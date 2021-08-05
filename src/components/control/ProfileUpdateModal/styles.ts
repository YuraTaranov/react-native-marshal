import {colors, width} from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    height: 400,
    width: width,
    margin: 0,
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white_FFFFFF,
  },
  genderContainer: {
    padding: 16,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderTitle: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 24,
  },
  genderCloseIcon: {
    height: 24,
    width: 24,
  },
});
