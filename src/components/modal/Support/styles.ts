import {StyleSheet} from 'react-native';
import {colors, fonts, top, ios, bottom} from '@constants';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
  },
  header: {
    backgroundColor: colors.green_27A74C,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: ios ? top + 44 : top + 32,
  },
  headerText: {
    color: colors.white_FFFFFF,
    fontFamily: fonts.interSemiBold_600,
    fontSize: 18,
    marginBottom: ios ? 12 : 16,
  },
  close: {
    position: 'absolute',
    right: 16,
    bottom: ios ? 12 : 16,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.white_FFFFFF,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  boldText: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 20,
  },
  phone: {
    color: colors.green_007E26,
    fontSize: 32,
    fontFamily: fonts.interSemiBold_600,
    marginTop: 16,
  },
  greyText: {
    color: colors.gray_6D6F79,
    fontSize: 16,
    marginTop: 8,
  },
  flexOne: {
    flex: 1,
  },
  supportOnline: {
    textAlign: 'center',
    color: colors.gray_2D2D2D,
    marginBottom: 16,
  },
  messengersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: bottom + 16,
  },
  messengerContainer: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginRight: 16,
  },
  messengerLogo: {
    width: '100%',
    height: '100%',
  },
});
