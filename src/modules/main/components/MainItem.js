import React, { Component, ComponentType } from 'react';
import { Svg, Polygon } from 'react-native-svg';
import { connectStyle, View, Touchable } from '../../common/components';
import { MainItemType } from '../types/Main';

class MainItem extends Component<MainItemType> {
  props: MainItemType;
  render() {
    const width: number = this.props.style.defaultWidth;
    const halfWidth: number = 0;
    const height: number = this.props.style.defaultHeight;
    const halfHeight: number = height / 2;
    const border: number = this.props.style.defaultBorder;
    const halfBorder: number = border / 2;
    const fill: string = this.props.style.defaultFill;

    const horizontalViewBox: string = `0 0 ${width} ${border}`;
    const verticalViewBox: string = `0 0 ${border} ${height}`;

    const rightArrow: Array<ComponentType> = [
      <Polygon key={0} points={`0,0 0,${border} ${halfWidth},${halfWidth} ${halfWidth},0`} fill={fill}/>,
      <Polygon key={1} points={`${halfWidth},0 ${width},${halfBorder} ${halfWidth},${border}`} fill={fill}/>,
    ];
    const leftArrow: Array<ComponentType> = [
      <Polygon key={0} points={`${width},0 ${width},${border} ${halfWidth},${halfWidth} ${halfWidth},0`} fill={fill}/>,
      <Polygon key={1} points={`${halfWidth},0 0,${halfBorder} ${halfWidth},${border}`} fill={fill}/>,
    ];
    const downArrow: Array<ComponentType> = [
      <Polygon key={0} points={`0,0 ${border},0 ${border},${halfHeight} 0,${halfHeight}`} fill={fill}/>,
      <Polygon key={1} points={`0,${halfHeight} ${border},${halfHeight} ${halfBorder},${height}`} fill={fill}/>,
    ];
    const upArrow: Array<ComponentType> = [
      <Polygon key={0} points={`0,${height} ${border},${height} ${border},${halfHeight} 0,${halfHeight}`} fill={fill}/>,
      <Polygon key={1} points={`0,${halfHeight} ${border},${halfHeight} ${halfBorder},0`} fill={fill}/>,
    ];

    const verticalBorder: ComponentType = (
      <Polygon key={0} points={`0,${height} ${border},${height} ${border}, 0 0, 0`} fill={fill}/>);

    const wrapperStyle: Array<{}> = [
      this.props.style.wrapper,
      { height },
    ];
    const horizontalStyle: Array<{}> = [
      this.props.style.horizontal,
      { height: border },
    ];
    const verticalStyle: Array<{}> = [
      this.props.style.vertical,
      { width: border },
    ];

    return (<View
        {...this.props}
        style={[wrapperStyle, this.props.width100 && this.props.style.width100, this.props.width50 && this.props.style.width50]}
      >
        {this.props.rightVertical &&
        <Svg viewBox={verticalViewBox} style={[this.props.style.svg, verticalStyle, this.props.style.top, this.props.style.right]}>
          {verticalBorder}
        </Svg>}
        {this.props.topRight &&
        <Svg viewBox={horizontalViewBox} style={[this.props.style.svg, horizontalStyle, this.props.style.top, this.props.style.left]}>
          {rightArrow}
        </Svg>}
        {this.props.topLeft && <Svg viewBox={horizontalViewBox} style={[this.props.style.svg, horizontalStyle, this.props.style.top, this.props.style.left]}>
          {leftArrow}
        </Svg>}
        {this.props.bottomRight &&
        <Svg viewBox={horizontalViewBox} style={[this.props.style.svg, horizontalStyle, this.props.style.bottom, this.props.style.left]}>
          {rightArrow}
        </Svg>}
        {this.props.bottomLeft &&
        <Svg viewBox={horizontalViewBox} style={[this.props.style.svg, horizontalStyle, this.props.style.bottom, this.props.style.left]}>
          {leftArrow}
        </Svg>}
        {this.props.leftUp && <Svg viewBox={verticalViewBox} style={[this.props.style.svg, verticalStyle, this.props.style.bottom, this.props.style.left]}>
          {upArrow}
        </Svg>}
        {this.props.leftDown && <Svg viewBox={verticalViewBox} style={[this.props.style.svg, verticalStyle, this.props.style.bottom, this.props.style.left]}>
          {downArrow}
        </Svg>}
        {this.props.rightUp && <Svg viewBox={verticalViewBox} style={[this.props.style.svg, verticalStyle, this.props.style.bottom, this.props.style.right]}>
          {upArrow}
        </Svg>}
        {this.props.rightDown &&
        <Svg viewBox={verticalViewBox} style={[this.props.style.svg, verticalStyle, this.props.style.bottom, this.props.style.right]}>
          {downArrow}
        </Svg>}
        <Touchable onPress={this.props.onPress} style={[this.props.style.wrapperChild, this.props.btnStyle]}>
          {this.props.children}
        </Touchable>
      </View>);
  }
}

export default connectStyle('NativeBase.MainItem', {})(MainItem);
