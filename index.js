import React from 'react';
import { YellowBox } from 'react-native';
import { StyleProvider } from 'native-base';
import { Provider as MobxProvider } from 'mobx-react';
import getTheme from './src/theme';
import variables from './src/constants/variables';

import registerScreens from './src/screens';
import store from './src/store';

registerScreens({}, (props: {}): {} => (
  <StyleProvider style={getTheme(variables)}>
    <MobxProvider {...store} {...props} />
  </StyleProvider>
)); // this is where you register all of your app's screens

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated', // TODO: временное решение, пока не исправят ошибку (https://github.com/react-navigation/react-navigation/issues/3956)
  'Module RCTImageLoader requires main',
]);
