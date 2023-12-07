import {StyleSheet} from '@components';
import {colors, fonts, bottom, width, top} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_FFFFFF,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.interMedium_500,
    lineHeight: 24,
    color: colors.black_1B1B1B,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
    borderBottomWidth: 2,
    borderColor: colors.gray_E1E1E8,
    flexDirection: 'row',
    marginTop: 16,
    height: 44,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  iconContainer: {
    marginRight: 10,
  },
  modalContainer: {
    margin: 0,
  },
  modalContentContainer: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    height: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    paddingTop: top + 8,
    justifyContent: 'center',
  },
  modalHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.interSemiBold_600,
  },
  closeModalContainer: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 16,
    top: top + 8,
  },
  closeModal: {
    width: 24,
    height: 24,
  },
  qrInfoBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrScanner: {
    width: width - 48,
    height: width - 48,
    alignSelf: 'center',
  },
  buttonContainer: {
    flex: 1,
    // backgroundColor: 'pink',
    justifyContent: 'flex-end',
  },
});
