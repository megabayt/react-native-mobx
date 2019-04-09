import React, { Component } from 'react';
import { connectStyle, InputNB } from './';
import variables from '../../../constants/variables';

type Props = {
  getRef?: ({}) => {}
};
class Input extends Component<Props> {
  props: Props;
  render() {
    return (<InputNB {...this.props} ref={this.props.getRef} placeholderTextColor={variables.inputColorPlaceholder}/>);
  }
}

// connect the component to the theme
export default connectStyle('NativeBase.Input', {})(Input);
