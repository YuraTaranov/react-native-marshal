import {Platform, Dimensions, Appearance} from 'react-native';

const {height} = Dimensions.get('window');

export const ios = Platform.OS === 'ios' ? true : false;
export const android = Platform.OS === 'android' ? true : false;
export const longScreen = height > 736;
export const darkMode = Appearance.getColorScheme() === 'dark';

import * as IphoneXhelper from 'react-native-iphone-x-helper';

export const isIphoneX: boolean = IphoneXhelper.isIphoneX();
