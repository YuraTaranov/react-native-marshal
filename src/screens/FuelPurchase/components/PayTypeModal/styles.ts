import {StyleSheet} from 'react-native';
import {colors, fonts, width, padding, isIphoneX} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    width,
    paddingVertical: padding,
    paddingHorizontal: padding,
    justifyContent: 'space-between',
    backgroundColor: colors.white_FFFFFF,
    paddingBottom: isIphoneX ? 50 : padding,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: padding,
  },
  buttonStyle: {
    width: '100%',
    marginTop: padding,
  },
  confirm: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 18,
    color: colors.black_1B1B1B,
  },
  title: {
    color: colors.black_1B1B1B,
    fontFamily: fonts.interMedium_500,
  },
  creditView: {
    width,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#aaa',
  }
});
