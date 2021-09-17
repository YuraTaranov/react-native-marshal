import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  eachScreen: {
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
  },
  textActive: {
    color: colors.green_00AE36,
    fontFamily: fonts.interSemiBold_600,
  },
});
