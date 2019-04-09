import { ComponentType } from 'react';

export type MainItemType = {
  // width?: number,
  // height?: number,
  // border?: number,
  // fill?: string,
  width100?: boolean,
  width50?: boolean,
  rightVertical?: boolean,
  topRight?: boolean,
  topLeft?: boolean,
  bottomRight?: boolean,
  bottomLeft?: boolean,
  leftUp?: boolean,
  leftDown?: boolean,
  rightUp?: boolean,
  rightDown?: boolean,
  style: {
    defaultWidth: number,
    defaultHeight: number,
    defaultBorder: number,
    defaultFill: string,
    wrapper: {},
    horizontal: {},
    vertical: {},
    width100: {},
    width50: {},
    top: {},
    left: {},
    right: {},
    bottom: {},
    svg: {},
    wrapperChild: {},
  }|[]|number,
  btnStyle?: {},
  children: ComponentType,
  onPress: () => void,
};

export type MainProps = {
  openModal: () => void,
  navigator: {},
  style: {}|[]|number,
};

export type SocialButtonsProps = {
  style: {
    socialBtn: {},
    socialBtnWrapper: {},
  },
  onPressSocial: string => () => void,
};

export type MenuItemType = {
  icon: string,
  text: string,
  scene: string,
  isModal: boolean,
};

export type MenuProps = {
  onPressItem: (() => void) => void
};
