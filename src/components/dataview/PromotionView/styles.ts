import {StyleSheet} from 'react-native';
import {colors, fonts, ios} from '@constants';

export default StyleSheet.create({
  container: {
    height: 180,
    marginBottom: 16,
  },
  contentContainer: {
    padding: 16,
    zIndex: 2,
    justifyContent: 'space-between',
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
    zIndex: 0,
    position: 'absolute',
  },
  background: {
    zIndex: 1,
    height: '100%',
    width: 285,
    position: 'absolute',
  },
  date: {
    fontSize: 12,
    color: colors.gray_F3F5FA,
  },
  title: {
    fontSize: ios ? 22 : 18,
    color: colors.white_FFFFFF,
    fontFamily: fonts.interSemiBold_600,
    marginTop: 16,
    width: 185,
  },
  description: {
    fontSize: ios ? 16 : 14,
    color: colors.white_FFFFFF,
    width: 170,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  priceNew: {
    fontSize: 28,
    color: colors.white_FFFFFF,
    fontFamily: fonts.interSemiBold_600,
  },
  priceOld: {
    fontSize: 16,
    color: colors.gray_F3F5FA,
    marginLeft: 8,
    marginTop: 6,
    textDecorationLine: 'line-through',
  },
});
