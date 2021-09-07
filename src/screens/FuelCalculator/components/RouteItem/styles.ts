import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

const iconSize = 54;
const rightIconSize = 38;
const Padding = 16;

export default StyleSheet.create({
  container: {
    width: '100%',
    borderColor: colors.gray_DADBDF,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    padding: Padding,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  leftView: {
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  summaryView: {},
  summaryText: {
    color: colors.gray_2D2D2D,
    fontFamily: fonts.interRegular_400,
    fontSize: 13,
  },
  distanceView: {},
  distanceText: {
    color: colors.black_1B1B1B,
    fontFamily: fonts.interMedium_500,
    fontSize: 16,
  },
  touch: {
    borderRadius: 10,
  },
  rightIconView: {
    width: iconSize + 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  blockText: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 3,
  },
  textTitle: {
    fontFamily: fonts.interMedium_500,
    fontSize: 17,
    color: colors.gray_2D2D2D,
  },
  iconView: {
    width: rightIconSize,
    height: rightIconSize,
    borderRadius: rightIconSize / 2,
    borderColor: colors.gray_DADBDF,
    borderWidth: 2,
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTextView: {
    flex: 1,
  },
  iconText: {
    fontFamily: fonts.interRegular_400,
    fontSize: 12.5,
    color: colors.gray_2D2D2D,
  },
});
