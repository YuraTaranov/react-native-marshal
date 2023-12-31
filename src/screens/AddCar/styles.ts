import {StyleSheet} from '@components';
import {bottom} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonTI: {
    width: '100%',
    height: 56,
    zIndex: 2,
    position: 'absolute',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: bottom,
  },
});
