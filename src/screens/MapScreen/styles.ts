import {StyleSheet} from '@components';
import {height} from '@constants';

export default StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    // height: height - 145,
    width: '100%',
    height: '100%',
  },
  buttonsBlock: {
    position: 'absolute',
    height: 190,
    width: 60,
    bottom: 46,
    right: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
