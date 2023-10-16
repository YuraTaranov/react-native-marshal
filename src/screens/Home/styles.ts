import {StyleSheet} from '@components';
import {android, colors, sizes, width} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBorder: {
    marginTop: 16 + 32,
    width: sizes.window_width - 32 * 2,
    marginLeft: 32,
  },
  buttonsBlock: {
    marginTop: 48,
    marginHorizontal: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainerCalc: {
    height: 46,
    width: width / 2,
    backgroundColor: colors.white_FFFFFF,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRightWidth: android ? 1 : 0.25,
    borderColor: '#dddfe0',
  },
  buttonContainerFuel: {
    height: 46,
    width: width / 2,
    backgroundColor: colors.white_FFFFFF,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 6,
  },
  buttonText: {
    marginRight: 24,
    textTransform: 'uppercase',
    fontSize: 12,
  },
});
