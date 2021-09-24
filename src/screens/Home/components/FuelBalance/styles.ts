import {StyleSheet} from 'react-native';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.green_27A74C,
    height: 160,
    padding: 16,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green_46C16B,
    height: 60,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: colors.green_27A74C,
    borderBottomWidth: 1,
  },
  fuelContainer: {
    height: 68,
    backgroundColor: colors.green_46C16B,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  fuelTypeContainer: {
    borderRightWidth: 1,
    borderColor: colors.green_27A74C,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fuelValueContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fuelTitle: {
    color: colors.green_EBFCF0,
  },
  fuelTypeValueContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  bonusValue: {
    color: colors.white_FFFFFF,
    fontSize: 24,
    fontFamily: fonts.interSemiBold_600,
  },
  fuelTypeValue: {
    color: colors.white_FFFFFF,
    fontSize: 20,
    fontFamily: fonts.interSemiBold_600,
    marginRight: 8,
  },
  fuelValue: {
    color: colors.white_FFFFFF,
    fontSize: 20,
    fontFamily: fonts.interSemiBold_600,
    marginTop: 2,
  },
  modalContainer: {
    flex: 1,
    margin: 0,
  },
  modalContentContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    height: 330,
    width: width,
    backgroundColor: colors.white_FFFFFF,
    bottom: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.black_1B1B1B,
    fontFamily: fonts.interSemiBold_600,
    fontSize: 18,
    marginBottom: 24,
  },
});
