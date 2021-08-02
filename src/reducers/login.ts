import {takeLatest, put, call, select, delay} from 'redux-saga/effects';
import {httpPost, navigate, errorHandler} from '@services';
import {urls} from '@constants';
import {setToken} from '@reducers/appGlobalState';

const CHECK_PHONE = '[login] CHECK_PHONE';
const SET_LOGIN = '[login] SET_LOGIN';
const SET_PHONE = '[login] SET_PHONE';
const SET_CODE = '[login] SET_CODE';
const SET_LOADING = '[login] SET_LOADING';
const CHECK_CODE = '[login] CHECK_CODE';

const RESET_LOGIN = '[login] RESET_LOGIN';

const initialstate = {
  phone: '',
  code: '',
  loading: false,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_LOGIN:
      return Object.assign({}, {...state, data: action.data});
    case SET_PHONE:
      return Object.assign({}, {...state, phone: action.data});
    case SET_CODE:
      return Object.assign({}, {...state, code: action.data});
    case SET_LOADING:
      return Object.assign({}, {...state, loading: action.data});
    case RESET_LOGIN:
      return initialstate;
    default:
      return state;
  }
};

export const checkPhone = (data: any) => ({data, type: CHECK_PHONE});
export const setLogin = (data: any) => ({data, type: SET_LOGIN});
export const setPhone = (data: string) => ({data, type: SET_PHONE});
export const setCode = () => ({type: SET_CODE});
export const checkCode = (data: string) => ({data, type: CHECK_CODE});
export const setLoading = (data: boolean) => ({data, type: SET_LOADING});
export const resetLogin = () => ({type: RESET_LOGIN});

export function* watchLogin() {
  yield takeLatest(CHECK_PHONE, checkPhoneAsync);
  yield takeLatest(CHECK_CODE, checkCodeAsync);
}

export function* checkPhoneAsync(action: any) {
  const {phone} = yield select(state => state.login);
  yield action.data.needNavigate && put(setLoading(true));
  try {
    // const body = yield call(() => httpPost(urls.login, {phone}));
    // yield put(setLoading(false));
    // if (body.data) {
    //   yield put(setLogin(body.data));
    //   navigate('CodeConfirm');
    // }
    yield delay(1000);
    yield put(setLoading(false));
    yield action.data.needNavigate && navigate('CodeConfirm');
  } catch (e) {
    yield put(setLoading(false));
    errorHandler(e, 'loginAsync');
  }
}

export function* checkCodeAsync(action: any) {
  yield put(setLoading(true));
  try {
    // const body = yield call(() => httpPost(urls.checkCode, {auth_sms: action.date}));
    // yield put(setLoading(false));
    // if (body.data) {
    //   yield put(setLogin(body.data));
    //   yield put(setToken(body.data.authToken));
    //   navigate('Registration');
    // }
    yield delay(1000);
    yield put(setLoading(false));
    yield navigate('Registration');
  } catch (e) {
    yield put(setLoading(false));
    errorHandler(e, 'checkCodeAsync');
  }
}
