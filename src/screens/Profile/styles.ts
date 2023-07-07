import {StyleSheet} from '@components';
import {sizes} from '@constants';

export default StyleSheet.create({
  contentContainer: {
    paddingBottom: 32,
  },
  container: {
    flex: 1,
  },
  gradientBorder: {
    width: sizes.window_width - 32 * 2,
    marginLeft: 16,
    marginBottom: 5,
  },
  menuItemsContainer: {
    flex: 1,
    paddingTop: 16,
  },
  leftIndent: {
    marginLeft: 26,
  },
});
