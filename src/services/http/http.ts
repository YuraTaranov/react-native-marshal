import axios from 'axios';
import {TGenerateOptions, TFormatResponse, TGlobalState} from '@types';
import storage from '../../store';
import {urls} from '@constants';

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
  } catch (error) {
    console.log("+++++ ERROR", JSON.parse(JSON.stringify(error))); // TEMP
    if (error.response?.status === 408 || error.code === 'ECONNABORTED') {
      throw formatResponse({
        status: 408,
        statusText: 'Request timeout!!',
      });
    }
    // if (error.response.data?.error === 'Unauthenticated.') {
    //   storage.store.dispatch(changeToken(''));
    //   //   navigate('AuthNavigator');
    //   Alert.alert('', i18next.t('Сесія закінчилася, потрібна повторна авторизація'));
    // }
    throw formatResponse(error.response);
  }
};

const generateOptions = ({method, url, data, params}: TGenerateOptions) => {
  const appGlobalState: any = storage?.store?.getState().appGlobalState || null;
  const token = appGlobalState.accessToken || '';

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'ru',

    // 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS, PATCH',
    // Accept: '*/*',
    // Host: 'dev.ungdomsappen.se',

    // 'Cache-Control': 'no-cache',
    // 'Accept-Encoding': 'gzip, deflate, br',

    // Accept: 'application/json',
    // 'Accept-Language': 'ru',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
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
      ...(token ? authHeaders : {}),
    },
  };
};
