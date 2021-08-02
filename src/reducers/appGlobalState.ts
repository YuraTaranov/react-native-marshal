import {takeLatest, put} from 'redux-saga/effects';
import i18next from 'i18next';
import {TGlobalState, TLang} from '@types';

const RESET_APP_GLOBAL_STATE = '[appGlobalState] RESET_APP_GLOBAL_STATE';
const CHANGE_LANG = '[appGlobalState] CHANGE_LANG';
const SET_LANG = '[appGlobalState] SET_LANG';
const SET_TOKEN = '[appGlobalState] SET_TOKEN';
const SET_ONBOARDING = '[appGlobalState] SET_ONBOARDING';
const SET_LOADER = '[appGlobalState] SET_LOADER';

const initialstate: TGlobalState['appGlobalState'] = {
  onBoarding: true,
  lang: 'uk',
  accessToken: '',
  loader: false,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_LANG:
      return Object.assign({}, {...state, lang: action.lang});
    case SET_TOKEN:
      return Object.assign({}, {...state, accessToken: action.token});
    case SET_ONBOARDING:
      return Object.assign({}, {...state, onBoarding: action.onBoarding});
    case SET_LOADER:
      return Object.assign({}, {...state, loader: action.data});
    case RESET_APP_GLOBAL_STATE:
      return initialstate;
    default:
      return state;
  }
};

export const setLang = (lang: TLang) => ({lang, type: SET_LANG});
export const setToken = (token: string) => ({token, type: SET_TOKEN});
export const setOnboarding = (onBoarding: boolean) => ({
  onBoarding,
  type: SET_ONBOARDING,
});
export const setLoader = (data: boolean) => ({data, type: SET_LOADER});
export const changeLang = (lang: TLang) => ({lang, type: CHANGE_LANG});
export const resetAppGlobalState = () => ({type: RESET_APP_GLOBAL_STATE});

export function* watchAppGlobalState() {
  yield takeLatest(CHANGE_LANG, changeLangAsync);
}

export function* changeLangAsync(data: any) {
  const {lang} = data;
  yield i18next.changeLanguage(lang);
  yield put(setLang(lang));
}
