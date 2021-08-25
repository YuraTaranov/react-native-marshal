import {colors, fonts, width} from '@constants';
import {StyleSheet} from 'react-native';
import {Platform} from '@components';
import { isIphoneX, ios, } from '@constants';

export default StyleSheet.create({
  container: {
    width,
    height: 248,
    backgroundColor: colors.white_FFFFFF,
    position: 'absolute',
    bottom: isIphoneX ? 60 : ios ? 48 : 48,
    left: -20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
        shadowOffset: {
          width: 0,
          height: -3,
        },
        shadowColor: 'gray',
        shadowRadius: 6,
      },
    }),
  },
  inContainer: {
    width: '100%',
    height: 200,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleView: {
    minHeight: 30,
    width: width - 100,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  addressView: {
    flexDirection: 'row',
    width: '100%',
  },

  buttonsView: {
    width: '100%',
    flexDirection: 'row',
    height: 60,
  },
  textTitle: {
    fontFamily: fonts.interSemiBold_600,
    color: colors.black_000000,
    fontSize: 19,
    lineHeight: 20,
    marginTop: 10,
  },
  location: {
    flex: 1,
  },
  addressTextView: {
    flex: 8,
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  textaddress: {
    fontFamily: fonts.interRegular_400,
    color: colors.black_000000,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'left',
    marginTop: 2,
  },
  eject: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 10,
  },
});
