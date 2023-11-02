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
    flex: 1,
    aspectRatio: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  date: {
    fontSize: 10,
    color: colors.black_1F1F1F,
    maxWidth: TITLE_WIDTH,
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
    textTransform: 'capitalize',
  },
  priceContainer: {
    // flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  priceNew: {
    fontSize: 24,
    zIndex: 50,
    color: colors.black_1F1F1F,
    fontFamily: fonts.interSemiBold_600,
  },
  priceOld: {
    fontSize: 16,
    color: colors.black_1F1F1F,
    marginTop: 2,
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
  imageContainer: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    position: 'absolute',
    bottom: -10,
    zIndex: 10,
    left: HALF_SCREEN_WIDTH - IMAGE_WIDTH / 2 + 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
