import {StyleSheet} from 'react-native';
import {colors, fonts, ios, sizes} from '@constants';

const HALF_SCREEN_WIDTH = sizes.window_width / 2;

const IMAGE_WIDTH = sizes.window_width / 3;
const TITLE_WIDTH = HALF_SCREEN_WIDTH - 64; //32*2 - paddings
const DESCRIPTION_WIDTH = sizes.window_width / 4;

export default StyleSheet.create({
  container: {
    height: 200,
    marginBottom: 16,
  },
  contentContainer: {
    width: sizes.window_width / 2,
    paddingLeft: 32,
    zIndex: 2,
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#EFEFF3',
  },
  backgroundImage: {
    zIndex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  image: {
    width: IMAGE_WIDTH,
    height: 150,
    position: 'absolute',
    bottom: -10,
    zIndex: 10,
    left: HALF_SCREEN_WIDTH - IMAGE_WIDTH / 2 + 16,
  },
  date: {
    fontSize: 12,
    color: colors.gray_F3F5FA,
  },
  title: {
    fontSize: ios ? 16 : 14,
    color: colors.black_1F1F1F,
    fontFamily: fonts.interRegular_400,
    width: TITLE_WIDTH,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: ios ? 16 : 14,
    color: colors.black_1F1F1F,
    width: DESCRIPTION_WIDTH,
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
  link: {
    color: colors.gray_7C7C7B,
    textTransform: 'uppercase',
    fontSize: 10,
    fontFamily: fonts.interBold_700,
  },
  leftSideContainer: {
    zIndex: 50,
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 16,
    left: 32,
    bottom: 16,
    justifyContent: 'space-between',
  },
});
