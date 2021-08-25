import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 80,
    width: 70,
    overflow: 'visible',
  },
  marker: {
    height: 62,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  selectedMarker: {
    height: 70,
    width: 58,
    // ...Platform.select({
    //   ios: {
    //     shadowOpacity: 0.9,
    //     shadowOffset: {
    //       width: 0,
    //       height: -3,
    //     },
    //     shadowColor: 'yellow',
    //     shadowRadius: 3,
    //   },
    // }),
  },
});
