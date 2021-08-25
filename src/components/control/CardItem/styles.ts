import {StyleSheet} from 'react-native';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 0,
    margin: 0,
    paddingVertical: 20,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.gray_DADBDF,
    borderBottomWidth: 1.75,
  },
  cardIconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumberView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  checkIconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumberText: {
    fontFamily: fonts.interRegular_400,
    fontSize: 16,
    color: colors.black_000000,
  },
});
