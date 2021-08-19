import {StyleSheet} from '@components';
import {colors, width, isIphoneX, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    width,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: colors.white_FFFFFF,
  },
  mainView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    marginBottom: isIphoneX ? 44 : 4,
    justifyContent: 'center',
  },
  usualButton: {
    marginTop: 20,
  },
  textDescription: {
    textAlign: 'center',
    fontFamily: fonts.interRegular_400,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
    color: colors.gray_404353,
  },
  cardLabel: {
    color: colors.gray_6D6F79,
    fontSize: 13,
    fontWeight: '400',
    margin: 0,
    padding: 0,
  },
  inputText: {
    color: colors.gray_2D2D2D,
    fontSize: 16,
    fontWeight: '400',
    margin: 0,
    padding: 0,
    marginLeft: -10,
    marginTop: -10,
  },
  inputContainer: {
    margin: 0,
    padding: 0,
  },
  hide: {
    color: colors.white_FFFFFF,
  }
});
