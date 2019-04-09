import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { connectStyle } from './';

type Props = {
  noOpacity: boolean,
  hitSlop: number | {
    top: number,
    left: number,
    right: number,
    bottom: number,
  },
};
class Touchable extends Component<Props> {
  static defaultProps = {
    noOpacity: false,
    hitSlop: {
      top: 8,
      left: 8,
      right: 8,
      bottom: 8,
    },
  };
  props: Props;
  getHitSlop = () => (typeof this.props.hitSlop === 'number'
    ? ({
      top: this.props.hitSlop,
      left: this.props.hitSlop,
      right: this.props.hitSlop,
      bottom: this.props.hitSlop,
    })
    : this.props.hitSlop);
  render() {
    const TComponent: React.ComponentType = this.props.noOpacity ? TouchableWithoutFeedback : TouchableOpacity;
    return <TComponent {...this.props} hitSlop={this.getHitSlop()} />;
  }
}

// connect the component to the theme
export default connectStyle('NativeBase.Touchable', {})(Touchable);
