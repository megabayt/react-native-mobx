import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { connectStyle } from './';
import icoMoonConfig from '../../../../assets/fonts/icomoon.json';

export default connectStyle('NativeBase.Icon', {})(createIconSetFromIcoMoon(icoMoonConfig));
