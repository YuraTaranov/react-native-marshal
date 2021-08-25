import {StyleSheet} from 'react-native';
import {colors} from '@constants';
import {shadowBlock} from '@helpers';

const MapButtonSize = 52;

export default StyleSheet.create({
  container: {
    width: MapButtonSize,
    height: MapButtonSize,
    borderRadius: MapButtonSize / 2,
    backgroundColor: colors.white_FFFFFF,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    ...shadowBlock,
  },
  green: {
    position: 'absolute',
    bottom: -4,
    backgroundColor: colors.green_41BB4E,
  },
});
