import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  loaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 9 / 2,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: '#9A1B18',
  },
});
