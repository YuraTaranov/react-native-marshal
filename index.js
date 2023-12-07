import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import './rn-debugger.config';
import {name} from './app.json';
import 'react-native-gesture-handler';
import './src/services/localization/i18n';
import {enableScreens} from 'react-native-screens';
import {initGeolocationPermissions} from './src/services';
import messaging from '@react-native-firebase/messaging';

LogBox.ignoreAllLogs();
initGeolocationPermissions();
enableScreens();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(name, () => App);
