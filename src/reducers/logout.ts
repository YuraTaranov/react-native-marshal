import {takeLatest, put, call} from 'redux-saga/effects';
import {setIsUserAuthorized, setToken} from './appGlobalState';

const LOGOUT = '[logout] GET_LOGOUT';

const initialstate = {};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const logout = () => ({type: LOGOUT});

export function* watchLogout() {
  yield takeLatest(LOGOUT, logoutAsync);
}

export function* logoutAsync() {
  yield put(setIsUserAuthorized(false));
  yield put(setToken(''));
  try {
    // const body = yield call(() => httpPost(urls.logout));
  } catch (e) {
    console.log(e, 'getLogoutAsync ERROR');
  }
}
