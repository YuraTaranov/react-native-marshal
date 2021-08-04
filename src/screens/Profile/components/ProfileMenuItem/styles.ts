import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.gray_E1E1E8,
  },
  nameContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    color: colors.black_1B1B1B,
    fontSize: 16,
    fontFamily: fonts.interSemiBold_600,
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
