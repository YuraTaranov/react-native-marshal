import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.green_27A74C,
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
  },
  cardStyle: {
    backgroundColor: colors.white_FFFFFF,
  },
});

export default styles;
