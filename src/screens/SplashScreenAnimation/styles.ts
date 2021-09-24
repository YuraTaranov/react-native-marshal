import {StyleSheet} from '@components';
import {colors} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009F30',
  },
  //   lottie: {
  //     flex: 1,
  //     ...Platform.select({
  //       android: {
  //         transform: [{scaleX: 1.08}, {scaleY: 1.08}],
  //         top: -27,
  //       },
  //       ios: {},
  //     }),
  //   },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 270,
    height: 228,
  },
  whiteLine: {
    height: 44,
    backgroundColor: colors.white_FFFFFF,
  },
  redLine: {
    height: 44,
    backgroundColor: colors.red_E30016,
  },
});
