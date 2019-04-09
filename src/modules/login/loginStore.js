// savePersonal
import { observable, action } from 'mobx';
import remotedev from 'mobx-remotedev';
import config from '../../constants/api';
import { sendRequest } from '../../utils/helpers';
import BaseStore from '../../utils/BaseStore';
import accountStore from '../account/accountStore';

@remotedev
class LoginStore extends BaseStore {
  @observable phone: string = '';
  @observable isValidPhone: boolean = false;
  @observable isSentPhone: boolean = false;
  @observable isValidCode: boolean = false;
  @observable isSentCode: boolean = false;
  @observable isSentReg: boolean = false;

  @action signIn = async (phone: string): Promise<void> => {
    this.phone = phone;
    return await this.sendSms();
  };

  @action sendSms = async (): Promise<void> => {
    this.isValidPhone = true;
    this.isSentPhone = false;
    await sendRequest({
      store: this,
      method: 'GET',
      url: `${config.API_URL}/signin`,
      data: {
        phone: this.phone,
      },
      onFail: (result) => {
        if (result !== undefined && result.code === 3) {
          this.isValidPhone = false;
        } else {
          this.error = result && result.message !== '' ? result.message : config.DEFAULT_ERR;
        }
      },
    });
    this.isSentPhone = true;
  };

  @action checkCode = async (code: string): Promise<void> => {
    this.isValidCode = true;
    this.isSentCode = false;
    await sendRequest({
      store: this,
      method: 'GET',
      url: `${config.API_URL}/checkcode`,
      data: {
        phone: this.phone,
        code,
      },
      onSuccess: (result) => {
        accountStore.token = result.data.token;
      },
      onFail: (result) => {
        if (result !== undefined && result.code === 8) {
          this.isValidCode = false;
        } else {
          this.error = result && result.message !== '' ? result.message : config.DEFAULT_ERR;
        }
      },
    });
    this.isSentCode = true;
  };

  @action resetLogin = (): void => {
    this.error = '';
    this.phone = '';
    accountStore.info.error = '';
    accountStore.info.isLoading = false;
    this.isLoading = false;
    this.isValidPhone = false;
    this.isSentPhone = false;
    this.isValidCode = false;
    this.isSentCode = false;
    this.isSentReg = false;
  }
}

const loginStore: LoginStore = new LoginStore();

export default loginStore;
