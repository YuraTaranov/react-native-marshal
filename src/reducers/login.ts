import {takeLatest, put, call, select, delay} from 'redux-saga/effects';
import {httpPost, navigate, errorHandler} from '@services';
import {urls} from '@constants';
import {
  setToken,
  setIsUserAuthorized,
  setLoader,
} from '@reducers/appGlobalState';
import {setProfile} from './profile';
import {Alert} from '@components';
import i18next from 'i18next';
import {setFaceIdActiveLocal} from './biometrics';

const CHECK_PHONE = '[login] CHECK_PHONE';
const SET_LOGIN = '[login] SET_LOGIN';
const SET_PHONE = '[login] SET_PHONE';
const SET_CODE = '[login] SET_CODE';
const SET_LOADING = '[login] SET_LOADING';
const LOGIN_WITH_BIOMETRICS = '[login] LOGIN_WITH_BIOMETRICS';
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
export const loginWithBiometrics = (data: any) => ({
  data,
  type: LOGIN_WITH_BIOMETRICS,
});
export const setLoading = (data: boolean) => ({data, type: SET_LOADING});
export const resetLogin = () => ({type: RESET_LOGIN});

export function* watchLogin() {
  yield takeLatest(CHECK_PHONE, checkPhoneAsync);
  yield takeLatest(CHECK_CODE, checkCodeAsync);
  yield takeLatest(LOGIN_WITH_BIOMETRICS, loginWithBiometricsAsync);
}

export function* checkPhoneAsync(action: any) {
  const {phone} = yield select(state => state.login);
  yield action.data.needNavigate && put(setLoading(true));
  try {
    const body = yield call(() =>
      httpPost(urls.checkPhone, {phone: `+380${phone}`}),
    );
    yield put(setLoading(false));
    if (body.status === 200) {
      yield action.data.needNavigate && navigate('CodeConfirm');
    }
  } catch (e) {
    yield put(setLoading(false));
    errorHandler(e, 'loginAsync');
  }
}

export function* checkCodeAsync(action: any) {
  const {phone} = yield select(state => state.login);
  yield put(setLoading(true));
  try {
    const body = yield call(() =>
      httpPost(urls.login, {auth_sms: action.data, phone: `+380${phone}`}),
    );
    yield put(setLoading(false));
    if (body.data.data) {
      yield put(setProfile(body.data.data));
      yield put(setToken(body.data.data.bearer_token));
      if (body.data.data.name) {
        yield put(setIsUserAuthorized(true));
        yield put(resetLogin());
      } else {
        navigate('Registration');
      }
    }
  } catch (e) {
    yield put(setLoading(false));
    errorHandler(e, 'checkCodeAsync');
  }
}

export function* loginWithBiometricsAsync(action: any) {
  const {user_key} = yield select(state => state.biometrics);
  yield put(setLoader(true));
  try {
    const {data} = yield call(() =>
      httpPost(urls.biometricsLogin, {
        ...action.data,
        user_key,
      }),
    );
    if (data) {
      yield put(setToken(data.data.bearer_token));
      yield put(setProfile(data.data));
      yield put(setIsUserAuthorized(true));
    } else {
      Alert.alert(
        '',
        i18next.t('Помилка, авторизуйтесь за допомогою логіна і пароля'),
      );
      yield put(setFaceIdActiveLocal(false));
    }
  } catch (error) {
    if (error?.data?.message === 'The given data was invalid.') {
      yield put(setFaceIdActiveLocal(false));
      return Alert.alert(
        '',
        i18next.t('Помилка, авторизуйтесь за допомогою логіна і пароля'),
      );
    } else if (error?.status === 500) {
      Alert.alert(
        '',
        i18next.t('Помилка, авторизуйтесь за допомогою логіна і пароля'),
      );
    } else {
      errorHandler(error, 'loginWithBiometricsAsync');
    }
  } finally {
    yield put(setLoader(false));
  }
}
