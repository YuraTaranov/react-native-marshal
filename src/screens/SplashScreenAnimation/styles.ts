import {Platform, StyleSheet} from '@components';
import {width} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: '#009F30',
  },
  lottie: {
    width,
    flex: 1,
    ...Platform.select({
      android: {
        transform: [{scaleX: 1.08}, {scaleY: 1.08}],
        top: -27,
      },
    }),
  },
});
