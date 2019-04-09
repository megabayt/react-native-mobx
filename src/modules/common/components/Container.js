import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { connectStyle, ContainerNB } from './';
import variables from '../../../constants/variables';

import backgroundImage from '../../../../assets/background.png';
import footerImage from '../../../../assets/footer.png';

type Props = {
  blue?: boolean,
  style: {} | [] | number,
  children: React.ComponentType,
}
class Container extends Component<Props> {
  props: Props;
  render() {
    const { blue } = this.props;
    const image: * = blue
      ? backgroundImage
      : footerImage;
    const style: * = !blue
      ? {
        top: null,
        width: '100%',
        height: null,
        minHeight: blue
          ? ((variables.deviceWidth * 2001) / 1125)
          : ((variables.deviceWidth * 921) / 1125),
      }
      : null;
    const resizeMode = blue ? 'cover' : 'contain';

    return (<ImageBackground
      resizeMode={resizeMode}
      source={image}
      style={this.props.style}
      imageStyle={style}
    >
      <ContainerNB
        {...this.props}
      >
        {this.props.children || ''}
      </ContainerNB>
    </ImageBackground>);
  }
}

// connect the component to the theme
export default connectStyle('NativeBase.Container', {})(Container);
