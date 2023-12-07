import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

const iconSize = 54;
const rightIconSize = 38;
const leftIconSize = 46;

export default StyleSheet.create({
  container: {
    width: '100%',
    borderBottomColor: colors.gray_DADBDF,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 19,
  },
  leftIconView: {
    width: iconSize,
    marginRight: 6,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  leftIcon: {
    width: leftIconSize,
    height: leftIconSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: colors.gray_E1E1E1,
  },
  stationImage: {
	  height: 30,
	  width: 30,
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
  blockTitle: {
    paddingBottom: 4,
  },
  textTitle: {
    fontFamily: fonts.interMedium_500,
    fontSize: 17,
    color: colors.gray_2D2D2D,
  },
  blockAddress: {},
  textAddress: {
    fontFamily: fonts.interRegular_400,
    fontSize: 14,
    lineHeight: 18,
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
