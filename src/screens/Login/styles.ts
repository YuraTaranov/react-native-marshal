import { StyleSheet } from '@components';
import { colors, fonts } from '@constants'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  contentContainer: {
    flex: 1,
  },
  prefix: {
    fontSize: 16,
    fontFamily: fonts.interRegular_400,
  },
  textInput: {
    alignItems: 'center',
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.interRegular_400,

  },
  phoneNumberView: {
    height: 56,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.interMedium_500,
    lineHeight: 24,
    color: colors.black_1B1B1B
  },
  closeBtn: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
