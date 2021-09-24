import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.gray_E1E1E8,
  },
  langContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.gray_E1E1E8,
  },
  langValue: {
    color: colors.gray_6D6F79,
  },
  name: {
    flex: 1,
    color: colors.black_1B1B1B,
    fontSize: 16,
    fontFamily: fonts.interSemiBold_600,
  },
  biometricsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.gray_E1E1E8,
  },
  biometricsTitle: {
    fontSize: 16,
    fontFamily: fonts.interSemiBold_600,
    color: colors.black_1B1B1B,
  },
  biometricsIsActive: {
    color: colors.gray_6D6F79,
    marginTop: 4,
  },
});
