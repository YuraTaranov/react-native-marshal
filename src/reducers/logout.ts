import {takeLatest, put} from 'redux-saga/effects';
import {setIsUserAuthorized, setToken} from './appGlobalState';
import {resetProfile} from './profile';

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
  yield put(resetProfile());
  try {
    // const body = yield call(() => httpPost(urls.logout));
  } catch (e) {
    console.log(e, 'getLogoutAsync ERROR');
  }
}
