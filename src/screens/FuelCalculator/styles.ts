import {StyleSheet} from '@components';
import {colors} from '@constants';
const Padding = 16;
const R = 4.4;
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  containerUp: {
    flex: 4,
    alignItems: 'center',
    padding: Padding,
  },
  line: {
    height: 24,
    position: 'absolute',
    left: 34,
    top: 50,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  circle: {
    height: R,
    width: R,
    borderRadius: R / 2,
    backgroundColor: colors.green_00AE36,
  },
  scrollView: {
    padding: Padding,
    position: 'absolute',
    left: 0,
    top: 175,
  },
});
