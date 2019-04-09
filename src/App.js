import { Navigation, NativeEventsReceiver } from 'react-native-navigation';
import store from './store';
import variables from './constants/variables';

export function startApp(): void {
  const { token } = store.accountStore;
  let initScene = 'LoginContainer';
  if (token !== '') {
    initScene = 'MainContainer';
  }
  // start the app
  Navigation.startSingleScreenApp({
    screen: {
      screen: initScene, // unique ID registered with Navigation.registerScreen
    },
    appStyle: {
      screenBackgroundColor: 'white',
      statusBarColor: 'transparent',
      drawUnderStatusBar: true,
      orientation: 'portrait',
    },
    animationType: 'slide-down', // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
  });
}

export default function appInit(): void {
  if (variables.platform === 'ios') {
    startApp();
  } else {
    Navigation.isAppLaunched()
      .then((appLaunched) => {
        if (appLaunched) {
          startApp(); // App is launched -> show UI
        } else {
          new NativeEventsReceiver().appLaunched(startApp); // App hasn't been launched yet -> show the UI only when needed.
        }
      })
      .catch(startApp);
  }
}
