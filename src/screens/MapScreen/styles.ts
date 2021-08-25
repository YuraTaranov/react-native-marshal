import {StyleSheet} from '@components';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonsBlock: {
    position: 'absolute',
    height: 190,
    width: 60,
    bottom: 70,
    right: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mapPadding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
