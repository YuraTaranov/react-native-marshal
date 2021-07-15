import { takeLatest, put } from 'redux-saga/effects';
import i18next from 'i18next';
import { TLang } from '@types';
import { languages } from '@constants';

const RESET_APP_GLOBAL_STATE = '[appGlobalState] RESET_APP_GLOBAL_STATE';
const CHANGE_LANG = '[appGlobalState] CHANGE_LANG';
const SET_LANG = '[appGlobalState] SET_LANG';
const SET_TOKEN = '[appGlobalState] SET_TOKEN';

const initialstate = {
  lang: languages.UA,
  accessToken: '',
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_LANG:
      return Object.assign({}, { ...state, lang: action.lang });
    case SET_TOKEN:
      return Object.assign({}, { ...state, accessToken: action.token });
    case RESET_APP_GLOBAL_STATE:
      return initialstate;
    default:
      return state;
  }
};

export const setLang = (lang: TLang) => ({ lang, type: SET_LANG });
export const setToken = (token: string) => ({ token, type: SET_TOKEN });

export const changeLang = (lang: TLang) => ({ lang, type: CHANGE_LANG });
export const resetAppGlobalState = () => ({ type: RESET_APP_GLOBAL_STATE });

export function* watchAppGlobalState() {
  yield takeLatest(CHANGE_LANG, changeLangAsync);
}

export function* changeLangAsync(data: any) {
  const { lang } = data;
  yield i18next.changeLanguage(lang);
  yield put(setLang(lang));
}