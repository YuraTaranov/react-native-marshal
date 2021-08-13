import {Platform} from 'react-native';

export const shadowBlock = Platform.select({
  ios: {
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'gray',
    shadowRadius: 2,
  },
  android: {
    elevation: 1.5,
  },
});
