import axios from 'axios';
import config from '../constants/api';
import accountStore from '../modules/account/accountStore';

type Request = {
  store: {},
  method: string,
  url: string,
  data: {},
  onSuccess: () => void,
  onFail: () => void,
  tries: number
};

const sleep = (delay = 500) => new Promise(resolve => setTimeout(resolve, delay));

export default (): void => {};
export async function sendRequest({
  store,
  method,
  url,
  data,
  onSuccess,
  onFail,
  tries = 0,
}: Request): Promise<void> {
  if (store === undefined) {
    return;
  }
  try {
    // reset store flags and errors
    store.error = '';
    store.isLoading = true;

    // forming request
    const req: {} = {
      method,
      url,
      data: method.toLowerCase() === 'post' ? data : null,
      params: method.toLowerCase() === 'get' ? data : null,
      json: true,
      gzip: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${accountStore.token}`,
        connection: 'keep-alive',
      },
      validateStatus: status => status >= 200 && status <= 401,
      timeout: config.TIMEOUT,
    };
    // send request
    const result: {} = await axios(req);

    if (typeof result.data === 'string' && tries < 5) {
      await sleep();
      await sendRequest({
        store, method, url, data, onSuccess, onFail, tries: tries + 1,
      });
      return;
    }

    // if token invalid, doing logout
    if (result.status === 401) {
      accountStore.logout(true);
      return;
    }

    // if (result.status === 400) {
    //   result.data = {};
    //   result.data.code = 255;
    // }
    if (result.data) {
      // if error go to callback
      if (result.data.code === undefined) {
        result.data.code = 255;
        result.data.message = config.DEFAULT_ERR;
      }
      if (result.data.code !== 0 && onFail !== undefined) {
        onFail(result.data);

        // if no callback setting server or default error
      } else if (result.data.code !== 0) {
        store.error = result.data.message || config.DEFAULT_ERR;
      }
      // if success go to callback
      if (result.data.code === 0) {
        store.success = true;
      }
      if (result.data.code === 0 && onSuccess !== undefined) {
        onSuccess(result.data);
      }
    }
    store.isLoading = false;
    // if server returned no data throw error
    // throw new Error('no data');
  } catch (err) {
    console.log(err); // eslint-disable-line

    // if error go to callback
    if (onFail !== undefined) {
      onFail({
        code: 255,
        message: err.request !== undefined && err.request.status === 0 ? config.NO_INTERNET_ERR : config.DEFAULT_ERR,
        data: err.response || {},
      });
    } else {
      // if no callback setting server or default error
      store.error = err.request !== undefined && err.request.status === 0 ? config.NO_INTERNET_ERR : config.DEFAULT_ERR;
    }
    store.isLoading = false;
  }
}
