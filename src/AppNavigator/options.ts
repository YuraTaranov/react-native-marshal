import styles from './styles';
import {colors, fonts} from '@constants';
import {StackNavigationOptions} from '@react-navigation/stack';

export const defaultStackOptions: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerStyle: styles.headerStyle,
  headerTitleStyle: styles.headerTitleStyle,
  headerTintColor: colors.black_000000,
  cardStyle: styles.cardStyle,
  headerRightContainerStyle: styles.headerRightContainerStyle,
  headerLeftContainerStyle: styles.headerLeftContainerStyle,
};

export const theme = {
  dark: false,
  colors: {
    primary: '', // The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
    background: '', // The color of various backgrounds, such as background color for the screens.
    card: '', // The background color of card-like elements, such as headers, tab bars etc.
    text: '', // The text color of various elements.
    // border: colors.RED, // The color of borders, e.g. header border, tab bar border etc.
  },
};

export const headerStyle = {
  headerTitleAlign: 'center',
  headerStyle: defaultStackOptions.headerStyle,
  headerTitleStyle: defaultStackOptions.headerTitleStyle,
};

export const darkRedOptions = {
  headerStyle: {backgroundColor: colors.dark_red_7C2022},
  headerTintColor: colors.white_FFFFFF,
  headerTitleStyle: {
    color: colors.white_FFFFFF,
    fontSize: 18,
    fontFamily: fonts.interSemiBold_600,
  },
};
export const cardStyle = styles.cardStyle;
