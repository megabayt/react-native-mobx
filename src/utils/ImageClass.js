import { observable } from 'mobx';
import { persist } from 'mobx-persist';

export default class Image {
  @persist @observable uri: string = '';
}
