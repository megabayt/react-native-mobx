import React, { Component } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { connectStyle } from './';

type Props = {
  getRef?: () => void
};
class MaskedInput extends Component<Props> {
  props: Props;
  getRef = (c: *): void => {
    if (this.props.getRef) {
      this.props.getRef(c);
    }
  };

  render() {
    return <TextInputMask
      ref={this.getRef}
      underlineColorAndroid='transparent'
      {...this.props}
    />;
  }
}

// connect the component to the theme
export default connectStyle('NativeBase.Input', {})(MaskedInput);
