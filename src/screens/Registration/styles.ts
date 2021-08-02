import {StyleSheet} from '@components';
import {colors, fonts, width} from '@constants';

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
  textInput: {
    alignItems: 'center',
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.interRegular_400,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.interMedium_500,
    lineHeight: 24,
    color: colors.black_1B1B1B,
  },
  buttonTI: {
    width: '100%',
    height: 56,
    zIndex: 2,
    position: 'absolute',
  },
  usualButton: {
    marginBottom: 16,
  },
  checkboxText: {
    width: width - 65,
  },
  checkBoxLink: {
    width: width - 65,
    textDecorationLine: 'underline',
  },
});
