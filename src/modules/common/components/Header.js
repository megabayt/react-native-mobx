import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet } from 'react-native';
import { Svg, Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import {
  connectStyle,
  HeaderNB,
  LeftNB,
  Body,
  Title,
  Right,
  Text,
  Icon,
  View,
  Touchable,
} from './';
import variables from '../../../constants/variables';

type Props = {
  hideBtn: boolean,
  inner: boolean,
  title: string,
  hideBonus: boolean,
  bonusCount: number,
  onPressBack?: () => void,
}
@inject(stores => ({
  bonusCount: stores.accountStore.info.bonus,
}))
@observer
class Header extends Component<Props> {
  props: Props;
  static defaultProps: Props = {
    hideBtn: false,
    inner: false,
    title: '',
    hideBonus: false,
    bonusCount: 0,
  };
  render() {
    const {
      hideBtn,
      inner,
      title,
      hideBonus,
      bonusCount,
      onPressBack,
    } = this.props;
    const icon = inner ? 'back' : 'home';
    return (<HeaderNB {...this.props} iosBarStyle="dark-content">
      <LeftNB>
        {!hideBtn && <Touchable onPress={onPressBack}>
          <Icon name={icon} small />
        </Touchable>}
      </LeftNB>
      <Body>
      <Title centered>{title}</Title>
      </Body>
      <Right>
        {!hideBonus && <Text>{bonusCount}</Text>}
        {!hideBonus && <Icon name={'zub'} small />}
      </Right>
    </HeaderNB>);
  }
}


const styles: StyleSheet = StyleSheet.create({
  headerWrapper: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  svg: {
    width: '100%',
    height: variables.toolbarShadowHeight,
  },
});
class HeaderWrapper extends Component {
  render() {
    return (<View style={styles.headerWrapper}>
      <Header {...this.props} />
      <Svg viewBox={'0 0 100 100'} style={styles.svg} preserveAspectRatio={'none'}>
        <Defs>
          <LinearGradient id="bottom" x1="0%" x2="0%" y1="0%" y2="100%">
            <Stop offset="0" stopColor={variables.white} stopOpacity='1' />
            <Stop offset="1" stopColor={variables.white} stopOpacity='0' />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={100} height={100} fill="url(#bottom)" />
      </Svg>
    </View>);
  }
}

export default connectStyle('NativeBase.Header', {})(HeaderWrapper);
