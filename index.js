/**
 * @format
 */
import React from 'react'
import {AppRegistry} from 'react-native';
import App from './js/App';
import {name as appName} from './app.json';
import WelcomePage from "./js/page/WelcomePage";
import 'react-native-gesture-handler';
import AppNavigators from "./js/navigator/AppNavigators";

AppRegistry.registerComponent(appName, () => App);
