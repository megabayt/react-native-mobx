import React, { Component } from 'react';
import _ from 'lodash';
import { Platform } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { Text } from '../components';
import { resetStyle, resetPadding, resetMargin, resetFlex } from '../../../constants/style';

export type Params = {
  widthCoef: number,
  heightCoef: number,
  border: number,
  x: number,
  y: number,
  backgroundColor: string,
  opacity: number,
}
type State = {
  width: number,
  height: number,
  mounted: boolean,
};
type Props = {
  shadowWidth?: number,
  shadowHeight?: number,
  shadowBlur?: number,
  shadowOpacity?: number,
  shadowX?: number,
  shadowY?: number,
  pullHalfHeight: boolean,
  onMount?: () => void,
  style: {} | [] | number,
  children: React.ComponentType,
};
type Setting = {
  color: string,
  border: number,
  opacity: number,
  radius: number,
  x: number,
  y: number,
  width: number,
  height: number,
  style: {
    backgroundColor: string,
    width: number | string,
    height: number | string,
    alignSelf: string,
    paddingHorizontal: number | string,
    paddingVertical: number | string,
    marginLeft: number | string,
    marginTop: number | string,
    overflow: string,
  },
};
type WCStyleType = {
  borderRadius: number | string,
  backgroundColor: string,
  overflow: string,
  width: number | string,
  height: number | string,
};
const withShadow = (params: Params = {}) => (WrappedComponent: React.ComponentType) => {
  class Shadow extends Component<Props, State> {
    props: Props;
    static defaultProps = {
      pullHalfHeight: false,
    };
    state: State = {
      width: 0,
      height: 0,
      mounted: false,
    };

    onLayout = (e: *): void => {
      const { width, height } = e.nativeEvent.layout;
      if (!this.state.mounted) {
        this.setState({ width, height, mounted: true }, () => {
          if (this.props.onMount) {
            this.props.onMount();
          }
        });
      }
    };

    getStyleObject = (): {} => _.reduce(this.props.style, (result, value, key) => {
      const isKeyNumber = typeof key === 'number';
      const item = isKeyNumber ? { ...value } : { [key]: value };
      result = {
        ...result,
        ...item,
      };
      return result;
    }, {});

    renderWithShadow(): React.ComponentType {
      const { width, height } = this.state;

      const widthCoef: number = this.props.shadowWidth || params.widthCoef || 0.9;
      const heightCoef: number = this.props.shadowHeight || params.heightCoef || 0.375;
      const shadowWidth: number = width * (widthCoef);
      const shadowHeight: number = height * (heightCoef);

      const style: {} = this.getStyleObject();

      const border: number = this.props.shadowBlur || params.border || 30;
      const x: number = ((width - shadowWidth) / 2) + (this.props.shadowX || params.x || 0);
      const y: number = ((height - shadowHeight) / 2) + (this.props.shadowY || params.y || 0);

      let offsetHorizontal: number = Platform.OS === 'android' ? (border * widthCoef) + x + (style.marginLeft || 0) : 0;
      let offsetVertical: number = Platform.OS === 'android' ? (border * heightCoef) + y : 0;
      if (style.position && style.position === 'absolute') {
        offsetHorizontal = 0;
        offsetVertical = 0;
      }
      const pullOffset: number = -(this.props.pullHalfHeight ? height / 2 : 0);
      const setting: Setting = {
        color: style.shadowColor || style.backgroundColor || params.backgroundColor || '#000',
        border,
        opacity: this.props.shadowOpacity || params.opacity || 0.5,
        radius: style.borderRadius || 0,
        x: x + offsetHorizontal,
        y: y + offsetVertical,
        width: width ? shadowWidth : 0,
        height: height ? shadowHeight : 0,
        style: {
          ...style,
          ...resetPadding,
          ...resetFlex,
          backgroundColor: 'transparent',
          width: width + (offsetHorizontal * 2),
          height: height + (offsetVertical * 2),
          alignSelf: Platform.OS === 'android' ? 'flex-start' : null,
          paddingHorizontal: offsetHorizontal,
          paddingVertical: offsetVertical,
          marginLeft: (style.marginLeft || 0) - offsetHorizontal,
          marginTop: ((style.marginTop || 0) - offsetVertical) + pullOffset,
          overflow: null,
        },
      };

      const objCondition: boolean = typeof this.props.children === 'object';

      const WCStyle: WCStyleType = {
        ...style,
        ...resetStyle,
        ...resetMargin,
        borderRadius: style.borderRadius,
        backgroundColor: style.backgroundColor,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      };

      return (<BoxShadow setting={setting}>
        <WrappedComponent
          {...this.props}
          _height={this.state.height}
          _width={this.state.width}
          style={WCStyle}
        >
          {objCondition ? this.props.children
            : <Text>{this.props.children}</Text>}
        </WrappedComponent>
      </BoxShadow>);
    }

    renderWithoutShadow() {
      const style = {
        ...this.getStyleObject(),
        opacity: 0,
      };
      const objCondition = typeof this.props.children === 'object';
      return (<WrappedComponent
        {...this.props}
        _height={this.state.height}
        _width={this.state.width}
        style={style}
        onLayout={this.onLayout}
      >
        {objCondition ? this.props.children
          : <Text>{this.props.children}</Text>}
      </WrappedComponent>);
    }

    render() {
      return this.state.mounted
        ? this.renderWithShadow()
        : this.renderWithoutShadow();
    }
  }

  Shadow.displayName = `withShadow(${(WrappedComponent && (WrappedComponent.displayName || WrappedComponent.name)) || ''})`;
  return Shadow;
};

export default withShadow;
