import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import './rn-debugger.config';
import {name} from './app.json';
import 'react-native-gesture-handler';
import './src/services/localization/i18n';
import {enableScreens} from 'react-native-screens';

LogBox.ignoreAllLogs();

enableScreens();
AppRegistry.registerComponent(name, () => App);
