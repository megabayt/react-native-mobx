import { StyleSheet } from 'react-native';
import { scaleW, scaleH } from '../../../constants/variables';

export default (variables: {}): {} => ({
  defaultWidth: scaleW(270),
  defaultHeight: variables.deviceHeight < 650 ? scaleH(70) : scaleH(77),
  defaultBorder: variables.platform === 'ios' ? StyleSheet.hairlineWidth : scaleW(1),
  defaultFill: '#fff',
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperChild: {
    alignItems: 'center',
  },
  width100: {
    width: '100%',
  },
  width50: {
    width: '50%',
  },
  svg: {
    position: 'absolute',
  },
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
  top: {
    top: 0,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  bottom: {
    bottom: 0,
  },
});
