/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import AppWithRedux from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
