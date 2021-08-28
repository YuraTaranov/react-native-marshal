import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import './rn-debugger.config';
import {name} from './app.json';
import 'react-native-gesture-handler';
import './src/services/localization/i18n';
import {enableScreens} from 'react-native-screens';
import {initGeolocationPermissions} from './src/services';

LogBox.ignoreAllLogs();
initGeolocationPermissions();
enableScreens();
AppRegistry.registerComponent(name, () => App);
