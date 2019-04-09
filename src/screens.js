import { Navigation } from 'react-native-navigation';

import LoginContainer from './modules/login/containers/LoginContainer';
import MainContainer from './modules/main/containers/MainContainer';

// register all screens of the app (including internal ones)
export default function registerScreens(store: {} = {}, Provider: {} = {}): void {
  Navigation.registerComponent('LoginContainer', () => LoginContainer, store, Provider);
  Navigation.registerComponent('MainContainer', () => MainContainer, store, Provider);
}
