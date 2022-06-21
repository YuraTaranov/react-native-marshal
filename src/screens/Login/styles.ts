import {StyleSheet} from '@components';
import {colors, fonts, android} from '@constants';

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
  phoneNumberView: {
    height: 56,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixContainer: {
    height: 54,
    justifyContent: 'center',
  },
  prefix: {
    fontSize: 16,
    fontFamily: fonts.interRegular_400,
  },
  textInput: {
    height: 54,
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.interRegular_400,
    marginTop: android ? 1.5 : 0,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.interMedium_500,
    lineHeight: 24,
    color: colors.black_1B1B1B,
  },
  closeBtn: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	marginBottom: 16
  },
  buttonStyle: {
	flex: 1,
  },
  bioButtonContainer: {
	height: 54,
	width: 54,
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 6,
	borderWidth: 2,
	borderColor: colors.gray_404353,
	marginLeft: 16
  },
  bioImage: {
	height: 24,
	width: 24,
  },
});
