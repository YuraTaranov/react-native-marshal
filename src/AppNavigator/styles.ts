import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors, fonts } from '@constants';
import EStyleSheet from 'react-native-extended-stylesheet';

const { width } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.green_27A74C,
  },
  headerTitleStyle: {
    fontSize: 18,
  },
  cardStyle: {
    backgroundColor: colors.white_FFFFFF,
  }
});

export default styles
