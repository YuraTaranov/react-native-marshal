import {StyleSheet} from '@components';
import {colors, bottom} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  borderViewContainer: {
    marginTop: 16,
    height: 56,
    borderBottomWidth: 1,
    borderColor: colors.gray_E1E1E8,
    paddingVertical: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  linkContainer: {},
  referralTitle: {
    fontSize: 12,
    color: colors.gray_6D6F79,
  },
  referralValue: {
    color: colors.black_000000,
    fontSize: 16,
    marginTop: 2,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: bottom,
  },
});
