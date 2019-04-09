import React, { Component } from 'react';
import { Keyboard, StyleSheet, BackHandler } from 'react-native';
import { inject, observer } from 'mobx-react';
import {
  Container,
  Content,
  Item,
  View,
  Text,
  Touchable,
  Icon,
} from '../../common/components';
import {
  Telephone,
  Code,
  TermsLink,
  SendAgain,
} from '../components/';
import variables, { scaleH } from '../../../constants/variables';
import config from '../../../constants/api';
import { withPreloader, withDebounce } from '../../common/decorators/';
import { LoginContainerState, LoginContainerProps } from '../types/Login';

const initState: LoginContainerState = {
  step: 1,
  phone: '',
  code: '',
  error: '',
  timeout: config.SENDCODE_DELAY,
  visibleHeight: null,
};

@inject(stores => ({
  token: stores.accountStore.token,
  isValidPhone: stores.loginStore.isValidPhone,
  isSentPhone: stores.loginStore.isSentPhone,
  isValidCode: stores.loginStore.isValidCode,
  isSentCode: stores.loginStore.isSentCode,
  isSentReg: stores.loginStore.isSentReg,
  phone: stores.loginStore.phone,

  signIn: stores.loginStore.signIn,
  sendSms: stores.loginStore.sendSms,
  checkCode: stores.loginStore.checkCode,
  resetLogin: stores.loginStore.resetLogin,
}))
@observer
@withPreloader({ store: 'loginStore', retry: 'resetLogin' })
export default class LoginContainer extends Component<LoginContainerProps, LoginContainerState> {
  props: LoginContainerProps;
  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: 'white',
  };
  state: LoginContainerState = {
    ...initState,
  };
  inputRef: * = null;
  keyboardDidShowListener: * = null;
  keyboardWillHideListener: * = null;

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onSceneChanged);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }
  componentWillUnmount() {
    clearInterval(this.timeout);
    this.keyboardDidShowListener.remove();
    this.keyboardWillHideListener.remove();
  }
  keyboardDidShow(e) {
    const newSize = variables.deviceHeight - e.endCoordinates.height;
    this.setState({
      visibleHeight: newSize,
    });
  }
  keyboardWillHide() {
    this.setState({
      visibleHeight: variables.deviceHeight,
    });
  }
  onSceneChanged = (e: *): void => {
    if (e.id === 'didAppear') {
      BackHandler.addEventListener('hardwareBackPress', this.resetLogin);
    }
    if (e.id === 'willDisappear') {
      this.componentWillUnmount();
      BackHandler.removeEventListener('hardwareBackPress', this.resetLogin);
    }
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps: LoginContainerProps): void {
    const prevProps: LoginContainerProps = this.props;
    if (!nextProps.isLoading && nextProps.error === '') {
      // :sectionCheckPhone
      if (!prevProps.isSentPhone && nextProps.isSentPhone) {
        this.onCheckPhone(nextProps.isValidPhone);
      }
      // :sectionCheckCode
      if (!prevProps.isSentCode && nextProps.isSentCode) {
        this.onCheckCode({
          isValid: nextProps.isValidCode,
          isNew: nextProps.isNew,
        });
      }
      if (prevProps.phone && !nextProps.phone && this.state.step === 2) {
        this.setState({
          ...initState,
        });
      }
    }
  }

  itemMounted = (): void => {
    if (this.inputRef
      && this.inputRef._root
      && this.inputRef._root.focus) {
      this.inputRef._root.focus();
    }
    if (this.inputRef
      && this.inputRef.refs
      && this.inputRef.refs['$input-text']
      && this.inputRef.refs['$input-text'].focus) {
      this.inputRef.refs['$input-text'].focus();
    }
  };

  getInputRef = (c: *): void => {
    this.inputRef = c;
  };

  onChangePhone = (event: *): void => {
    this.setPhone(event.nativeEvent.text);
  };

  setPhone(phone: string): void {
    if (phone.charAt(4) === '8') {
      phone = phone.slice(0, 3) + phone.slice(5);
    }
    this.setState({ phone });
  }

  onChangeCode = (event: *): void => {
    this.setCode(event.nativeEvent.text);
  };

  setCode(code: string): void {
    this.setState({
      code,
    }, () => {
      const newCode = this.state.code.replace(/\s/g, '').slice(0, 4);
      if (newCode.length >= 4) {
        Keyboard.dismiss();
        this.checkCode(newCode);
      }
    });
  }

  @withDebounce({ trailing: true })
  checkCode(code: string): void {
    this.props.checkCode(code); // GOTO sectionCheckCode
  }

  @withDebounce()
  sendPhone(): void {
    if (this.props.isLoading) {
      return;
    }
    const phone = this.state.phone.replace(/\D/g, '');
    const regex = /9\d{9}/;
    if (regex.test(phone)) {
      Keyboard.dismiss();
      this.props.signIn(phone.slice(1, 11)); // GOTO sectionCheckPhone
    } else {
      this.onCheckPhone(false);
    }
  }

  onCheckPhone = (isValid: boolean): void => {
    if (isValid) {
      this.setState({
        step: 2,
        error: '',
        timeout: config.SENDCODE_DELAY,
      }, this.setSendAgainTimeout);
    } else {
      this.setState({
        error: 'Проверьте правильность \n введенного номера',
      });
    }
  };

  setSendAgainTimeout(): void {
    this.timeout = setInterval(() => {
      this.setState({
        timeout: this.state.timeout - 1,
      }, () => {
        if (this.state.timeout <= 0) {
          clearInterval(this.timeout);
        }
      });
    }, 1000);
  }

  onCheckCode = (result: {}): void => {
    const { navigator } = this.props;
    if (result.isValid) {
      navigator.resetTo({ screen: 'MainContainer' });
    } else {
      this.setState({
        error: 'Код введен неверно',
      });
    }
  };

  @withDebounce()
  onPressTerms(): void {
    if (!this.props.isLoading) {
      this.props.navigator.push({ screen: 'TermsContainer' });
    }
  }

  resetLogin = (): boolean => {
    if (this.state.step === 2) {
      this.setState({
        ...initState,
      }, this.props.resetLogin);
      return true;
    }
    return false;
  }

  render() {
    const {
      error,
      step,
      phone,
      code,
      timeout,
      visibleHeight,
    } = this.state;
    const { isLoading } = this.props;
    let extraHeight: number = scaleH(20);
    if (variables.platform === 'ios' && step === 1) {
      extraHeight = scaleH(60);
    }
    if (variables.platform === 'android' && step === 2) {
      extraHeight = scaleH(60);
    }
    const logoNotFit = visibleHeight < 520;
    return <Container>
      <Content
        listenKB
        enableOnAndroid
        // enableAutomaticScroll={false}
        extraHeight={extraHeight}
        extraScrollHeight={extraHeight}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode='on-drag'
        isLoading={isLoading}
      >
        <Text pageTitle pageTitleNotFit={logoNotFit} pushLeftItem>Вход</Text>
        <Item onMount={this.itemMounted}>
          {step === 1 && <Telephone
            value={phone}
            onChangePhone={this.onChangePhone}
            getInputRef={this.getInputRef}
          />}
          {step === 2 && <Code
            value={code}
            onChangeCode={this.onChangeCode}
          />}
        </Item>
        <View selfCenter pushTop={!logoNotFit} padderHorizontal width100 alignCenter>
          {step === 1 && <TermsLink
            error={error}
            onPressNext={this.sendPhone}
            onPressTerms={this.onPressTerms}
          />}
          {step === 2 && <SendAgain
            error={error}
            timeout={timeout}
            canSendAgain={timeout <= 0}
            onPressSendAgain={this.sendPhone}
          />}
        </View>
      </Content>
      {step === 2 && (<View login>
        <Touchable onPress={this.resetLogin}>
          <Icon name={'back'} blue />
        </Touchable>
      </View>)}
    </Container>;
  }
}

const styles: StyleSheet = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});
