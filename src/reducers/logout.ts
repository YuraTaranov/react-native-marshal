import {takeLatest, put} from 'redux-saga/effects';
import {setIsUserAuthorized, setToken} from './appGlobalState';
import {resetProfile} from './profile';

const SET_BIO_TURN_OFF_AFTER_LOGOUT = '[logout] SET_BIO_TURN_OFF_AFTER_LOGOUT';
const LOGOUT = '[logout] GET_LOGOUT';

const initialstate = {
  bioTurnOffAfterLogout: false,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_BIO_TURN_OFF_AFTER_LOGOUT:
      return Object.assign({}, {...state, bioTurnOffAfterLogout: action.data});
    default:
      return state;
  }
};

export const setBioTurnOffAfterLogout = (data: boolean) => ({
  data,
  type: SET_BIO_TURN_OFF_AFTER_LOGOUT,
});
export const logout = () => ({type: LOGOUT});

export function* watchLogout() {
  yield takeLatest(LOGOUT, logoutAsync);
}

export function* logoutAsync() {
  yield put(setBioTurnOffAfterLogout(true));
  yield put(setIsUserAuthorized(false));
  yield put(setToken(''));
  yield put(resetProfile());
  try {
    // const body = yield call(() => httpPost(urls.logout));
  } catch (e) {
    console.log(e, 'getLogoutAsync ERROR');
  }
}
