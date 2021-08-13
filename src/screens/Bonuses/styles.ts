import {StyleSheet} from '@components';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 198,
    backgroundColor: colors.green_27A74C,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: 'center',
  },
  headerImage: {
    height: 70,
    width: 77,
    marginTop: 24,
  },
  headerBalance: {
    color: colors.green_EBFCF0,
    marginTop: 24,
  },
  headerValue: {
    marginTop: 8,
    fontSize: 24,
    fontFamily: fonts.interSemiBold_600,
    color: colors.white_FFFFFF,
  },
  borderBottomView: {
    height: 80,
    borderBottomWidth: 1,
    borderColor: colors.gray_E1E1E8,
    padding: 16,
  },
  borderBottomViewTitle: {
    fontSize: 13,
    color: colors.gray_2D2D2D,
  },
  borderBottomViewValue: {
    fontSize: 16,
    fontFamily: fonts.interSemiBold_600,
    color: colors.black_1B1B1B,
    marginTop: 6,
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.gray_E1E1E8,
  },
  termsTitle: {
    fontSize: 16,
    color: colors.black_1B1B1B,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
    position: 'absolute',
    bottom: 0,
    width: width,
  },
});
