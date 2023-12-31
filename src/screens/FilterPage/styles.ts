import {StyleSheet} from '@components';
import {colors, width, ios, isIphoneX, fonts} from '@constants';
import {forNoAnimation} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_FFFFFF,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 0,
    margin: 0,
  },
  addressView: {
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  iconView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  addressTextView: {
    flex: 8,
    paddingTop: 1,
  },
  addressText: {
    fontFamily: fonts.interRegular_400,
    fontSize: 16,
    lineHeight: 24,
  },
  header: {
    width,
    height: 68,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomColor: colors.gray_DADBDF,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerText: {
    fontFamily: fonts.interMedium_500,
    fontSize: 19,
    fontWeight: '500',
  },
  itemView: {
    flexDirection: 'row',
    width,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.gray_DADBDF,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 9,
  },
  leftView: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  leftText: {
    fontFamily: fonts.interRegular_400,
    fontSize: 16.4,
  },
  rightText: {
    fontFamily: fonts.interMedium_500,
    fontSize: 16.4,
  },
  buttonView: {
    width,
    paddingHorizontal: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: isIphoneX ? 52 : ios ? 30 : 30,
  },
});
