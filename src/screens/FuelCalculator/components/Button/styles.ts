import {StyleSheet} from 'react-native';
import {width} from '@constants';
const Padding = 16;

export default StyleSheet.create({
  buttonContainer: {
    width: width - Padding * 2,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginVertical: Padding,
  },
  usualButton: {},
});
