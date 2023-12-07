import {StyleSheet} from 'react-native';
import {colors, width, isIphoneX, fonts} from '../../../constants';
const PAD = 20;
const W = width - PAD * 2;

export default StyleSheet.create({
  container: {
    width,
    margin: 0,
    padding: 0,
    marginTop: -10,
  },
  cardView: {
    width: W,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: PAD,
  },
  row: {
    width: W,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    padding: 0,
  },
  defaultCCInput: {
    margin: 0,
    padding: 0,
    width: W / 2.2,
    height: 54,
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderColor: colors.gray_DADBDF,
    marginBottom: PAD,
  },
});
