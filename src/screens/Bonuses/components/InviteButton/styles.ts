import {StyleSheet} from 'react-native';

import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    marginTop: 48,
    marginHorizontal: 16,
    height: 46,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.red_CA001A,
    textTransform: 'uppercase',
    fontFamily: fonts.interBold_700,
  },
});
