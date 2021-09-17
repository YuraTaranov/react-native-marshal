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
    height: 150,
    width: width,
    backgroundColor: colors.white_FFFFFF,
    bottom: 0,
    position: 'absolute',
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.interMedium_500,
    marginBottom: 24,
  },
});
