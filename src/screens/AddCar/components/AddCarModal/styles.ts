import {StyleSheet} from 'react-native';
import {colors, width, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  contentContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    height: 330,
    width: width,
    backgroundColor: colors.white_FFFFFF,
    bottom: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.black_1B1B1B,
    fontFamily: fonts.interSemiBold_600,
    fontSize: 18,
  },
  bonusCard: {
    fontSize: 16,
    color: colors.gray_2D2D2D,
    textAlign: 'center',
    marginTop: 32,
  },
  qrCodeContainer: {
    height: 160,
    width: 160,
    alignSelf: 'center',
    marginTop: 16,
  },
  flatList: {
    marginTop: 18,
  },
  itemContainer: {
    marginBottom: 20,
  },
  name: {
    color: colors.black_1B1B1B,
    fontSize: 16,
  },
});
