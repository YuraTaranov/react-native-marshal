import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors, fonts } from '@constants';
import EStyleSheet from 'react-native-extended-stylesheet';

const { width } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: 17,
    backgroundColor: colors.green_27A74C,
  },
  headerRightContainerStyle: {
    marginRight: 17
  },
  headerLeftContainerStyle: {
    marginLeft: 17,
  },
  headerTitleStyle: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 18,
  },
  cardStyle: {
    backgroundColor: colors.white_FFFFFF,
  }
});

export default styles
