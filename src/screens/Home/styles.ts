import {StyleSheet} from '@components';
import {colors, fonts, width} from '@constants';
import {shadowBlock} from '@helpers';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(249, 249, 249)',
  },
  headerContentContainer: {
    backgroundColor: colors.green_27A74C,
    height: 132,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 16,
  },
  balanceContainer: {
    height: 88,
    marginTop: 8,
    backgroundColor: colors.green_46C16B,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  bonusesContainer: {
    borderRightWidth: 1,
    borderColor: colors.green_27A74C,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fuelContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceTitle: {
    color: colors.green_EBFCF0,
  },
  balanceValue: {
    marginTop: 8,
    color: colors.white_FFFFFF,
    fontSize: 24,
    fontFamily: fonts.interSemiBold_600,
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
