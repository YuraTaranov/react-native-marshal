import {StyleSheet} from 'react-native';

import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    color: colors.black_1A1718,
    textTransform: 'uppercase',
    fontSize: 16,
    fontFamily: fonts.interMedium_500,
  },
  bonusCardNumber: {
    color: colors.gray_6D6F79,
    marginTop: 4,
  },
  notificationsText: {
    color: colors.green_00AE36,
    marginTop: 4,
  },
});
