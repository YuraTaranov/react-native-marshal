import axios from 'axios';
import {TGenerateOptions, TFormatResponse} from '@types';
import storage from '../../store';
import {urls} from '@constants';
import { setIsUserAuthorized, setToken } from '@reducers/appGlobalState';

// FIXME: add prod url
const baseURL = __DEV__ ? urls.baseDevURL : urls.baseProdURL;

const instance = axios.create();
instance.defaults.baseURL = baseURL;
instance.defaults.timeout = 24000;

export const httpPost = (url: string, data?: any) =>
  sendRequest({method: 'POST', url, data});
export const httpGet = (url: string, params?: any) =>
  sendRequest({method: 'GET', url, params});
export const httpDel = (url: string, data?: any) =>
  sendRequest({method: 'DELETE', url, data});
export const httpPut = (url: string, data?: any) =>
  sendRequest({method: 'PUT', url, data});
export const httpPatch = (url: string, data?: any) =>
  sendRequest({method: 'PATCH', url, data});

const formatResponse: (response?: any) => TFormatResponse = (
  response = {},
) => ({
  data: response.data || {},
  status: response.status || 418,
  statusText: response.statusText || '',
});

const sendRequest = async ({
  method,
  url,
  data = undefined,
  params = undefined,
}: TGenerateOptions) => {
  const OPTIONS = generateOptions({method, url, data, params});

  try {
    const response = await instance(OPTIONS);
    return formatResponse(response);
  } catch (error: any) {
    __DEV__ && console.log('---ERROR---', JSON.parse(JSON.stringify(error)));

    if (error.response?.status === 408 || error.code === 'ECONNABORTED') {
      throw formatResponse({
        status: 408,
        statusText: 'Request timeout!!',
      });
    }
    if (error.response.data?.message === 'Unauthenticated.') {
      storage.store.dispatch(setToken(''));
      storage.store.dispatch(setIsUserAuthorized(false));
    }
    throw formatResponse(error.response);
  }
};

const generateOptions = ({method, url, data, params}: TGenerateOptions) => {
  const appGlobalState: any = storage?.store?.getState().appGlobalState || null;
  const token = appGlobalState.accessToken || '';
  const locale = appGlobalState.lang === 'uk' ? 'ua' : appGlobalState.lang;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'ru',
  };

  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };

  return {
    method,
    url,
    data,
    params,
    headers: {
      ...defaultHeaders,
      locale,
      ...(token ? authHeaders : {}),
    },
  };
};
