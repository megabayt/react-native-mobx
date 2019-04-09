import React, { Component } from 'react';
import { Linking, StatusBar, AppState, BackHandler, Alert } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {
  connectStyle,
  Content,
  View,
  Logo,
  Container,
  Button,
} from '../../common/components';
import { Menu, SocialButtons } from '../components';
import variables from '../../../constants/variables';
import { withDebounce } from '../../common/decorators';
import { MainProps } from '../types/Main';

class MainContainer extends Component<MainProps> {
  props: MainProps;
  static navigatorStyle = {
    navBarHidden: true,
    backgroundColor: variables.bgColor,
  };
  navigated: boolean = null;
  timeout: * = null;
  prevState: string = null;
  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onSceneChanged);
    AppState.addEventListener('change', this.appStateChecker);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.appStateChecker);
  }
  appStateChecker = (state: string): void => {
    if (this.prevState && this.prevState !== state && this.prevState === 'background' && this.navigated) {
      this.resetNavigated(0);
    }
    this.prevState = state;
  }
  onSceneChanged = (e: *): void => {
    if (e.id === 'didAppear' && variables.platform === 'android') {
      StatusBar.setBackgroundColor('transparent');
      BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    }
    if (e.id === 'willDisappear') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    }
    if (e.id === 'didDisappear') {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.resetNavigated(1000);
    }
  }
  onBackPressed = () => {
    if (!this.props.openedModalKey) {
      Alert.alert(
        'Выход',
        'Вы действительно хотите выйти из приложения?',
        [
          {
            text: 'Да',
            onPress: () => {
              RNExitApp.exitApp();
            },
          },
          {
            text: 'Нет',
            onPress: () => {},
          },
        ],
        { cancelable: true },
      );
      return true;
    }
    return false;
  }
  onPressItem = (params: {}) => (): void => {
    this.navigateTo(params);
  };
  @withDebounce()
  navigateTo({ scene, isModal }: { scene: string, isModal: boolean }): void {
    if (scene) {
      if (!isModal) {
        if (!this.navigated) {
          const { navigator } = this.props;
          navigator.push({
            screen: scene,
            animationType: 'slide-horizontal',
          });
        }
      } else {
        this.props.openModal(scene, () => {
          this.resetNavigated(500);
        });
      }
      this.setNavigated();
    }
  }
  onSocialClick = (soc: string) => (): void => {
    let url: string = '';
    switch (soc) {
      case 'vk':
        url = 'https://vk.com/';
        break;
      case 'fb':
        url = 'https://www.facebook.com/';
        break;
      case 'inst':
        url = 'https://www.instagram.com/';
        break;
      default:
        break;
    }
    this.openUrl(url);
  };
  @withDebounce()
  openUrl(url: string): void {
    if (this.navigated) {
      return;
    }
    this.setNavigated();
    if (url !== '') {
      Linking.canOpenURL(url).then((canOpen) => {
        if (canOpen) {
          return Linking.openURL(url)
            .then(() => { this.resetNavigated(0); })
            .catch((err) => { this.resetNavigated(0); console.error(err); }); // eslint-disable-line
        }
        return true;
      }).catch((err) => { this.resetNavigated(0); console.error(err); }); // eslint-disable-line
    } else {
      this.resetNavigated(0);
    }
  }

  setNavigated(): void {
    if (variables.platform === 'android') {
      this.navigated = true;
    }
  }

  resetNavigated(timeout: number = 0): void {
    if (timeout === 0) {
      this.navigated = null;
      return;
    }
    this.timeout = setTimeout(() => {
      this.navigated = null;
    }, timeout);
  }

  render() {
    const { style } = this.props;
    return (<Container blue>
      <Content noHeader>
        <View style={style.content}>
          <View style={style.logo} padderHorizontal>
            <Logo logoFill={'#fff'} textFill={'#fff'}/>
          </View>
          <Menu onPressItem={this.onPressItem} style={style}/>
          <View padder width100>
            <Button onPress={this.onPressItem({ scene: 'AppointmentContainer' })}>Записаться к врачу</Button>
          </View>
          <SocialButtons style={style} onPressSocial={this.onSocialClick}/>
        </View>
      </Content>
    </Container>);
  }
}

export default connectStyle('NativeBase.Main', {})(MainContainer);
