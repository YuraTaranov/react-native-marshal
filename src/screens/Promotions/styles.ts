import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  emptyTitle: {
    textAlign: 'center',
    fontFamily: fonts.interSemiBold_600,
    fontSize: 16,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  activeBtn: {
    backgroundColor: colors.red_D61920,
  },
  btnTitle: {
    fontFamily: fonts.interBold_700,
    color: colors.red_CA001A,
    fontSize: 16,
  },
  activeBtnTitle: {
    color: colors.white_FFFFFF,
  },
  dateTimeView: {
    marginTop: 60,
    alignItems: 'center',
  },
  year: {
    fontFamily: fonts.interRegular_400,
    fontSize: 28,
    marginBottom: 20,
  },
  month: {
    fontFamily: fonts.interRegular_400,
    fontSize: 30,
    color: colors.red_CA001A,
    marginBottom: 20,
  },
  literSum: {
    fontFamily: fonts.interRegular_400,
    fontSize: 30,
  },
  liter: {
    fontSize: 18,
    fontFamily: fonts.interRegular_400,
  },
  desc: {
    flexWrap: 'wrap',
    fontSize: 13,
    textAlign: 'right',
    fontFamily: fonts.interRegular_400,
  },
  title: {
    fontSize: 26,
    color: colors.red_CA001A,
    fontFamily: fonts.interMedium_500,
  },
  titleDesc: {
    fontSize: 14,
    color: colors.red_CA001A,
    fontFamily: fonts.interMedium_500,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoView: {
    flex: 1,
    justifyContent: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: '100%',
  },
  wrapper: {
    flex: 1,
  },
  emptyLine: {
    height: 30,
  },
  btnWrapper: {
    marginTop: 24,
  },
  btnView: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
  },
});
