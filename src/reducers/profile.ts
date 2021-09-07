import {takeLatest, put, call, select} from 'redux-saga/effects';
import {httpGet, errorHandler} from '@services';
import {urls} from '@constants';

const GET_PROFILE = '[profile] GET_PROFILE';
const SET_PROFILE = '[profile] SET_PROFILE';
const RESET_PROFILE = '[profile] RESET_PROFILE';

const initialstate = {};

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

export function* watchProfile() {
  yield takeLatest(GET_PROFILE, getProfileAsync);
}

export function* getProfileAsync() {
  try {
    const body = yield call(() => httpGet(urls.getProfile));
    if (body.data.data) {
      yield put(setProfile(body.data.data));
    }
  } catch (e) {
    errorHandler(e, 'getProfileAsync');
  }
}
