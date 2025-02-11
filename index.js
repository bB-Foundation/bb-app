/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import TextEncoder from 'react-native-fast-encoder';

window.TextEncoder = TextEncoder;
window.TextDecoder = TextEncoder;

if (__DEV__) {
  require('./ReactotronConfig');
}

AppRegistry.registerComponent(appName, () => App);
