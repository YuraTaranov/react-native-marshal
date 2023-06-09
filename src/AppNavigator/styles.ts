import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.white_FFFFFF,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerRightContainerStyle: {
    marginRight: 17,
  },
  headerLeftContainerStyle: {
    marginLeft: 12,
  },
  headerTitleStyle: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 18,
    color: colors.black_000000,
  },
  cardStyle: {
    backgroundColor: colors.white_FFFFFF,
  },
});

export default styles;
