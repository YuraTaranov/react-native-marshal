import {StyleSheet} from '@components';
import {colors, width, ios, isIphoneX, fonts} from '@constants';

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
  },
  addressText: {
    fontFamily: fonts.interRegular_400,
    fontSize: 16,
    lineHeight: 24,
  },
  header: {
    width,
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomColor: colors.gray_DADBDF,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: fonts.interMedium_500,
    fontSize: 18.5,
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
  },
  leftView: {
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
    fontSize: 16,
  },
  rightText: {
    fontFamily: fonts.interMedium_500,
    fontSize: 16,
  },
  buttonView: {
    width,
    paddingHorizontal: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: isIphoneX ? 52 : ios ? 30 : 30,
  },
});
