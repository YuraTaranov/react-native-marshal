import {takeLatest, put, call} from 'redux-saga/effects';
import {httpGet, errorHandler, httpDel} from '@services';
import {urls} from '@constants';
import {logout} from './logout';
import { setFaceIdActiveLocal } from './biometrics';
import { ReactNativeBiometrics } from '@components';
import { setLoader } from './appGlobalState';
import { resetNotifications } from './notifications';

const GET_PROFILE = '[profile] GET_PROFILE';
const SET_PROFILE = '[profile] SET_PROFILE';
const DELETE_PROFILE = '[profile] DELETE_PROFILE';
const RESET_PROFILE = '[profile] RESET_PROFILE';

const initialstate = {
  data: [],
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_PROFILE:
      return Object.assign({}, {...state, data: action.data});
    case RESET_PROFILE:
      return initialstate;
    default:
      return state;
  }
};

export const getProfile = () => ({type: GET_PROFILE});
export const setProfile = (data: any) => ({data, type: SET_PROFILE});
export const resetProfile = () => ({type: RESET_PROFILE});
export const deleteProfile = () => ({type: DELETE_PROFILE});

export function* watchProfile() {
  yield takeLatest(GET_PROFILE, getProfileAsync);
  yield takeLatest(DELETE_PROFILE, deleteProfileAsync);
}

export function* getProfileAsync() {
  try {
    const {data} = yield call(() => httpGet(urls.getProfile));
    if (data.data) {
      yield put(setProfile(data.data));
    }
  } catch (e) {
    errorHandler(e, 'getProfileAsync');
  }
}

export function* deleteProfileAsync() {
  try {
	yield put(setLoader(true))
    const {data} = yield call(() => httpDel(urls.deleteProfile));
	if (data.success) {
	  yield put(setFaceIdActiveLocal(false))
      yield ReactNativeBiometrics.deleteKeys();
	  yield put(resetNotifications())
	  yield put(logout())
	}
  } catch (e) {
    errorHandler(e, 'deleteProfileAsync');
  } finally {
	yield put(setLoader(false))
  }
}
