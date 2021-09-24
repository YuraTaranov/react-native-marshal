import {StyleSheet} from '@components';
import {colors, width} from '@constants';
import {shadowBlock} from '@helpers';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(249, 249, 249)',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonContainerCalc: {
    height: 56,
    width: width / 2 - 24,
    backgroundColor: colors.white_FFFFFF,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 16,
    borderRadius: 6,
    ...shadowBlock,
  },
  buttonContainerFuel: {
    height: 56,
    width: width / 2 - 24,
    backgroundColor: colors.white_FFFFFF,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 6,
    ...shadowBlock,
  },
  buttonText: {
    marginLeft: 8,
  },
});
