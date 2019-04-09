import { observable, action, computed } from 'mobx';
import { create, persist } from 'mobx-persist';
import remotedev from 'mobx-remotedev';
import { AsyncStorage, Alert, AppState } from 'react-native';
import RNRestart from 'react-native-restart';
import config from '../../constants/api';
import { sendRequest } from '../../utils/helpers';
import BaseStore from '../../utils/BaseStore';
import appInit from '../../App';
import variables from '../../constants/variables';

// eslint-disable-next-line
const dummyBarcode: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAADVCAMAAAD957zKAAAAHnRFWHRTb2Z0d2FyZQBid2lwLWpzLm1ldGFmbG9vci5jb21Tnbi0AAABQVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACmBC6SAAAAa3RSTlMA/wM9dZ/D0Nrk7vj+9uzUtIlICxKO6fKMGE7qRED5+zkG6MiAXyIPCgwWLlmHzuJaQrEns9HPttjvrPOemdWwuP219RMl999hxx463rIIqmdHKRACDhkrWIhDm02PiuarMzhwv83X7cRREXpNH2gAAANKSURBVHic7dhnc9RVFAdgNooNFMFGMc2CsYKAFREURcEu2CtY4ft/AM5/4IY9TI7wQu/OdZ7fm9yzJ/lt7jOZ2d1sm13Ptkj72s7zu/nHbj7far6d7735Obd67Fa/Y/U8W+3nv2+rn/2n59587HZ/MXjwtuyBBy8HHjx48IoeePBy4MGDB6/ogQcvBx48ePCKHnjwcuDBgwev6IEHLwcePHjwih548HLgwYMHr+iBBy8HHjx48IoeePBy4MGDB6/ogQcvBx48ePCKHnjwcuDBgwev6IEHLwcePHjwih548HLgwYMHr+iBBy8HHjx48IoeePBy4MGDB6/ogQcvBx48ePCKHnjwcuDBgwev6IEHLwcePHjwih548HLgwYMHr+iBBy8HHjx48IoeePBy4MGDB6/ogQcvBx48ePCKHnjwcuDBgwev6IEHLwcePHjwih548HLgwYMHr+iBBy8HHjx48IoeePBy4MGDB6/ogQcvBx48ePCKHnjwcuDBgwev6IEHLwcePHjwih548HLgwYMHr+iBBy8HHjx48IoeePBy4MGDB6/ogQcvBx48ePCKHnjwcuDBgwev6IEHLwcePHjwih548HLg/Z/xRETkX8z64SOvvHH87Xc//HRRm3Gz/ER7bTrw/WI242b/yo1X+5UfF7EZNw8/MN3m1TffOnl6+ps4338zcB6Jqxxam07vnY3jz/0342bp0bjJ2rXzuR2z2S8Xem8Gzh1xpyfb8FkMl3pvBs6dcY+n2vB5DL/13gyc7XGPp9vwRQwnem8Gzl1xj+U2fBnD7703A+fuuMfBNpyP4Y/em4FzT9zjmTZsxPBn783AuTfusdGG9em9WO/NwLkv7rHehgsx/NV7M3Di/epsaXOK4UzvzcDZOX+ppRhWe28Gzv1xj2fb8NX0kb33ZuBM/+t4rg1fz78K9toMnF1xj+fb8E0Mf/feDJwH4x4vtOHbGI703gyc3XGPF9vwXQy7e28Gzp64x0ttmP5Lebn3ZuA89Fhc5OVr54/iuHKl92bk7J0+Kh2dTu9/HMdf+28Gzr4D0zvW17afOHUmDjsv9t+MnMdXZzfy0yI2I2ft0OadflhayGbkbBw+9vrx2TsffLK8qM1/lqvK7Q3OjNwHKAAAAABJRU5ErkJggg==';

class Info extends BaseStore {
  @computed get isEmpty(): boolean {
    return !this.barcode && !this.bonus;
  }

  @persist @observable barcode: string = dummyBarcode;
  @persist @observable is_promo: boolean = false;
  @persist @observable bonus: number = 0;
  @persist @observable phone: string = '';
  @persist @observable firstname: string = '';
  @persist @observable lastname: string = '';
  @persist @observable midname: string = '';
  @persist @observable pushActive: boolean = true;
}

@remotedev
class AccountStore {
  @persist @observable token: string = '';
  @observable logouting: boolean = false;
  @computed get info(): Info {
    return this._info;
  }
  set info(obj: {}): void {
    for (const key in obj) {
      this._info[key] = obj[key];
    }
  }
  @computed get pushActive(): boolean {
    return this.info.pushActive;
  }
  set pushActive(val: boolean): void {
    this.info.pushActive = val;
  }
  @persist('object', Info) @observable _info: Info = new Info();

  @action getUserData = async (): Promise<void> => {
    await sendRequest({
      store: this.info,
      method: 'GET',
      url: `${config.API_URL}/get-user-data`,
      onSuccess: (result) => {
        this.info = result.data;
      },
    });
  };

  @action setPushToken = async (fcmToken: string): Promise<void> => {
    await sendRequest({
      store: {},
      method: 'POST',
      data: {
        fcmToken,
        deviceType: variables.platform === 'ios' ? 0 : 1,
      },
      url: `${config.API_URL}/set-push-token`,
    });
  };

  @action logout = async (withWarning: boolean = false): Promise<void> => {
    if (this.logouting) {
      return;
    }
    this.logouting = true;
    if (withWarning) {
      Alert.alert(
        'В Ваш аккаунт совершен вход с другого устройства.',
        'Пожалуйста, авторизуйтесь повторно',
        [
          {
            text: 'OK',
            onPress: () => {
              AsyncStorage.clear(() => {
                RNRestart.Restart();
              });
            },
          },
        ],
        { cancelable: false },
      );
    } else {
      AsyncStorage.clear(() => RNRestart.Restart());
    }
  }
}
const accountStore: AccountStore = new AccountStore();

let prevState: string;
AppState.addEventListener('change', (state: string): void => {
  if (prevState && prevState !== state && prevState === 'background' && accountStore.logouting) {
    accountStore.logouting = false;
    accountStore.logout();
  }
  prevState = state;
});

const timer: Promise<void> = new Promise(resolve => setTimeout(resolve, 3000));
const hydrator: Promise<void> = create({ storage: AsyncStorage })('account', accountStore);

Promise.race([hydrator, timer])
  .then(appInit)
  .catch(appInit);

export default accountStore;
