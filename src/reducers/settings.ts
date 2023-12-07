import {takeLatest, put, call, select} from 'redux-saga/effects';
import {setLoader} from './appGlobalState';
import {httpGet, httpPost, navigate, errorHandler} from '@services';
import {urls} from '@constants';

const GET_SETTINGS = '[settings] GET_SETTINGS';
const SET_SETTINGS = '[settings] SET_SETTINGS';
const RESET_SETTINGS = '[settings] RESET_SETTINGS';

const initialstate = {};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_SETTINGS:
      return Object.assign({}, {...state, data: action.data});
    case RESET_SETTINGS:
      return initialstate;
    default:
      return state;
  }
};

export const getSettings = () => ({type: GET_SETTINGS});
export const setSettings = (data: any) => ({data, type: SET_SETTINGS});
export const resetSettings = () => ({type: RESET_SETTINGS});

export function* watchSettings() {
  yield takeLatest(GET_SETTINGS, getSettingsAsync);
}

export function* getSettingsAsync() {
  const {lang} = yield select(state => state.appGlobalState);
  const locale = lang === 'uk' || lang === 'ru' ? 'ua' : lang;
  try {
    const body = yield call(() =>
      httpGet(`${urls.getSettingsText}?locale=${locale}`),
    );
    if (body.data.data) {
      yield put(setSettings(body.data.data));
    }
  } catch (e) {
    errorHandler(e, 'getSettingsAsync');
  }
}
