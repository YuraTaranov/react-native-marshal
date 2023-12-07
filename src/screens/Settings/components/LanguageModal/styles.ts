import {StyleSheet} from 'react-native';
import {width, colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  contentContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    height: 200,
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
    marginBottom: 24,
  },
});
