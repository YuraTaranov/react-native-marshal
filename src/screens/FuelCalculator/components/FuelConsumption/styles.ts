import {StyleSheet} from 'react-native';
import {fonts, width} from '@constants';
const Padding = 16;

export default StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 180,
    flexDirection: 'row',
  },
  fuelConsumptionView: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fuelConsumptionText: {
    fontFamily: fonts.interRegular_400,
    fontSize: 16.5,
    lineHeight: 17,
    marginLeft: 2,
  },
  inputContainer: {
    width: (width - Padding * 2) * 0.72,
    marginRight: 15,
  },
});

export const withRoute = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 126,
    flexDirection: 'row',
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconView: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  labelText: {
    fontFamily: fonts.interRegular_400,
    fontSize: 16.5,
    lineHeight: 17,
    marginLeft: 2,
  },
});
