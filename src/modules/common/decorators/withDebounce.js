import { Platform } from 'react-native';
import _ from 'lodash';

const DEFAULT_DELAY: number = Platform.OS === 'ios' ? 450 : 1000;

type Params = {
  delay: number,
  withParams: boolean,
  trailing: boolean,
};
type Options = {
  leading: boolean,
  trailing: boolean,
};

type Target = {

};
type Descriptor = {
  configurable: boolean,
  enumerable: boolean,
  value: {} | () => {} | () => void,
};

export default (params: Params = {}) => (target: Target, key: string, descriptor: Descriptor) => {
  const delay: number = params.delay || DEFAULT_DELAY;
  const withParams: boolean = params.withParams || false;
  const options: Options = params.trailing ? { leading: false, trailing: true } : { leading: true, trailing: false };
  return {
    configurable: true,
    enumerable: descriptor.enumerable,
    get: function getter() {
      // Attach this function to the instance (not the class)
      const newDescriptor: Descriptor = {
        configurable: true,
        enumerable: descriptor.enumerable,
        value: withParams
          ? (...args) => _.debounce(descriptor.value.bind(this, ...args)().bind(this), delay, options)
          : _.debounce(descriptor.value.bind(this), delay, options),
      };
      Object.defineProperty(this, key, newDescriptor);
      return this[key];
    },
  };
};
