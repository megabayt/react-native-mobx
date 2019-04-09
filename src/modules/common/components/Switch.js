import React, { Component } from 'react';
import { Animated, View, TouchableWithoutFeedback } from 'react-native';
import { connectStyle } from './';

type Props = {
  value: boolean,
  style?: {
    field?: {},
    checked?: {},
    button?: {},
  },
  onValueChange: () => void,
};
type State = {
  left: number,
};
class Switch extends Component<Props, State> {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    const left = !props.value
      ? new Animated.Value(1)
      : new Animated.Value(26);

    this.state = {
      left,
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.value !== prevState.value) {
  //   return {
  //     animate: true,
  //   };
  // }
  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.animate(this.props.value);
    }
  }

  onValueChange = () => {
    this.props.onValueChange(!this.props.value);
    this.animate(this.props.value);
  }

  animate = (oldVal) => {
    const left = !oldVal ? 26 : 1;
    Animated.timing(this.state.left, {
      duration: 200,
      toValue: left,
    }).start();
  }

  render() {
    return (
      <TouchableWithoutFeedback
        offset={15}
        onPress={this.onValueChange}
      >
        <View style={[this.props.style.field, !this.props.value && this.props.style.checked]}>
          <Animated.View
            style={[
              this.props.style.button,
              { left: this.state.left },
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connectStyle('NativeBase.Switch', {})(Switch);
