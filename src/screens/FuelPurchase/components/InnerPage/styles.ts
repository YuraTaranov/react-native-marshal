import {StyleSheet} from 'react-native';
import {
  height,
  width,
  isIphoneX,
  ios,
  colors,
  fonts,
  padding,
} from '@constants';

const Header = isIphoneX ? 200 : ios ? 135 : 130;
const WRow = width - padding * 2;
const WIcon = 150;
const WInputText = WRow - WIcon;

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 54,
    height: height - Header,
    width,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding,
  },
  scrollView: {
    paddingBottom: 100,
    marginBottom: isIphoneX ? 50 : 20,
  },
  priceContainer: {
    width: WRow,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  row: {
    width: WRow,
    flexDirection: 'row',
    height: 68,
    marginVertical: 4,
    paddingBottom: 20,
    borderBottomColor: colors.gray_8D909D,
  },
  phoneRow: {
    width: WRow,
    height: 68,
    marginVertical: 4,
    paddingBottom: 20,
    borderBottomColor: colors.gray_8D909D,
  },
  inputContainer: {
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
    height: 68,
	flex: 1,
  },
  inputRow: {
    // width: WInputText + 10,
    width: 215,
  },
  curView: {
    width: 100,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  curText: {
    fontFamily: fonts.interMedium_500,
    fontSize: 18,
    color: colors.black_1B1B1B,
    textAlign: 'right',
  },
  buttonContainer: {
	  paddingBottom: ios ? 0 : 24,
	  width: '100%'
  },
  usualButton: {
    width: '100%',
  },
});
