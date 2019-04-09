import { observable, computed, action } from 'mobx';

export default class BaseStore {
  @observable _isLoading: boolean = false;
  @observable _error: string = '';
  @observable isEmpty: boolean = true;
  @observable success: boolean = false;

  @computed get isLoading(): boolean {
    return this.isEmpty ? this._isLoading : false;
  }
  set isLoading(val: boolean): void {
    this._isLoading = val;
  }
  @computed get error(): string {
    return this.isEmpty ? this._error : '';
  }
  set error(val: string): void {
    this._error = val;
  }

  @action reset = (): void => {
    this.isLoading = false;
    this.error = '';
    this.success = false;
  }
}
