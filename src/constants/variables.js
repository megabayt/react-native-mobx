// #region variables
import { Platform, Dimensions, StatusBar, StyleSheet } from 'react-native';

const deviceHeight:number = Dimensions.get('window').height;
const deviceWidth:number = Dimensions.get('window').width;
const platform:string = Platform.OS;
const platformStyle:string = 'material';
const isIphoneX:boolean =
  platform === 'ios' && deviceHeight === 812 && deviceWidth === 375;
const iPhone5sWidth:number = 320;
const iPhone5sHeight:number = 568;
const statusBarHeight:number = parseFloat(StatusBar.height);

function scale(val:number, scaler:number):number {
  let newVal:number = Math.floor(scaler * val);
  if (Math.abs(newVal) < StyleSheet.hairlineWidth) {
    if (newVal >= 0) {
      newVal = StyleSheet.hairlineWidth;
    } else {
      newVal = -StyleSheet.hairlineWidth;
    }
  }
  return newVal;
}
export function scaleW(val: number):number {
  return scale(val, deviceWidth / iPhone5sWidth);
}
export function scaleH(val: number):number {
  return scale(val, deviceHeight / iPhone5sHeight);
}

type Variables = {
  primaryColor1: string,
  primaryColor2: string,
  primaryColor3: string,
  primaryColor4: string,
  primaryColor5: string,
  primaryColor6: string,
  white: string,
  defaultTextColor: () => string,
  inputColorPlaceholder: () => string,
  inputColor: () => string,
  toolbarDefaultBg: () => string,
  toolbarShadowHeight: number,
  toolbarHeight: () => number,
  statusBarColor: () => string,
  contentWidth: () => number,
  itemWidth: () => number,
  itemContentWidth: () => number,
  inputHeightBase: number,
  contentPadding: number,
  itemPaddingW: number,
  itemPaddingH: number,
  headerPaddingTop: number,
  defaultBorderRadius: number,
  inputFontSize: () => number,
  iconFontSize: number,
  defaultFontSize: number,
};

const variables:Variables = {
  platformStyle,
  platform,
  deviceHeight,
  deviceWidth,

  primaryColor1: '#BF1363',
  primaryColor2: '#00A8B5',
  primaryColor3: '#9B9B9B',
  primaryColor4: '#C7C7D3',
  primaryColor5: '#587280',
  primaryColor6: '#0B3954',
  white: '#fff',
  get defaultTextColor() { return this.primaryColor6; },
  get inputColorPlaceholder() { return this.primaryColor6; },
  get inputColor() { return this.primaryColor6; },
  get toolbarDefaultBg() { return this.white; },
  toolbarShadowHeight: scaleW(20),
  get toolbarHeight() {
    return this.platform === 'ios' ? 56 + (statusBarHeight || 0) : 25;
  },
  get statusBarColor() { return this.white; },

  get contentWidth() { return deviceWidth - (this.contentPadding * 2); },
  get itemWidth() { return deviceWidth - this.contentPadding; },
  get itemContentWidth() { return this.itemWidth - (this.itemPaddingW * 2); },
  inputHeightBase: scaleW(40),
  contentPadding: scaleW(20),
  itemPaddingW: scaleW(30),
  itemPaddingH: scaleH(15),
  headerPaddingTop: isIphoneX ? 49 : 30,

  defaultBorderRadius: scaleW(5),

  get inputFontSize() { return this.defaultFontSize; },
  iconFontSize: scaleW(18),
  defaultFontSize: scaleW(13),
};

export default variables;
