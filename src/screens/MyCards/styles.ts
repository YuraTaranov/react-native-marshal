import {StyleSheet} from '@components';
import {colors, width, isIphoneX, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    width,
    justifyContent: 'space-between',
  },
  mainView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  noCard: {
    padding: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: isIphoneX ? 45 : 3,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.white_FFFFFF,
  },
  usualButton: {},
  titletext: {
    textAlign: 'center',
    fontFamily: fonts.interSemiBold_600,
    fontSize: 20,
    lineHeight: 28,
    color: colors.black_1E1A1A,
    marginBottom: 16,
  },
  discriptText: {
    textAlign: 'center',
    fontFamily: fonts.interRegular_400,
    fontSize: 16.3,
  },
  //__________
  contentContainer: {
    width: '100%',
  },

});
