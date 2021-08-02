import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';
import {verticalScale} from '@helpers';

export default StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.interMedium_500,
    lineHeight: 24,
    color: colors.black_1B1B1B,
  },
  codeFiledRoot: {
    marginTop: 16,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.gray_E1E1E8,
    borderBottomWidth: 2,
  },
  cellText: {
    color: colors.black_000000,
    fontSize: 18,
    fontFamily: fonts.interMedium_500,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: colors.gray_2D2D2D,
    borderBottomWidth: 2,
  },
  usualBtn: {
    marginVertical: verticalScale(16),
  },
  centerLeftInput: {
    marginLeft: 16,
    marginRight: 8,
  },
  centerRightInput: {
    marginLeft: 8,
    marginRight: 16,
  },
});
