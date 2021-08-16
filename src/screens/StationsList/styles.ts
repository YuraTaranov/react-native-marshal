import {StyleSheet} from '@components';
import {colors, ios} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_FFFFFF,
    padding: 20,
    overflow: 'visible',
  },
  contentContainer: {},
  footer: {
    height: ios ? 200 : 20,
  },
});
