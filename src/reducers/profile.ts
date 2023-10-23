import {takeLatest, put, call, select} from 'redux-saga/effects';
import {httpGet, errorHandler, httpDel} from '@services';
import {urls} from '@constants';
import {logout} from './logout';
import {setFaceIdActiveLocal} from './biometrics';
import {ReactNativeBiometrics} from '@components';
import {setLoader, setType} from './appGlobalState';
import {resetNotifications} from './notifications';
import {capitalizeUserPersonalData} from '@helpers';
import {getPetrolStations} from './petrolStations';
import {getSettings} from './settings';
import {getPromotionsMain} from './promotionsMain';
import {getFuel} from './fuel';
import {getPromotions} from './promotions';
import {getCards} from './cards';

const GET_PROFILE = '[profile] GET_PROFILE';
const GET_INITIAL_DATA = '[profile] GET_INITIAL_DATA';
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
export const getInitialData = (type: 'initial' | 'connection') => ({
  data: type,
  type: GET_INITIAL_DATA,
});
export const setProfile = (data: any) => ({data, type: SET_PROFILE});
export const resetProfile = () => ({type: RESET_PROFILE});
export const deleteProfile = () => ({type: DELETE_PROFILE});

export function* watchProfile() {
  yield takeLatest(GET_PROFILE, getProfileAsync);
  yield takeLatest(DELETE_PROFILE, deleteProfileAsync);
  yield takeLatest(GET_INITIAL_DATA, getInitialDataAsync);
}

export function* getInitialDataAsync(action: any) {
  if (action.data === 'connection') {
    yield put(getCards());
  }
  yield put(getPetrolStations());
  yield put(getSettings());
  yield put(getPromotionsMain());
  yield put(getFuel());
  yield put(getPromotions({page: 1}));
}
export function* getProfileAsync() {
  const {fuelType} = yield select(state => state.appGlobalState);
  if (!fuelType) {
    yield put(setType(1));
  }

  yield put(setLoader(false));

  try {
    const {data} = yield call(() => httpGet(urls.getProfile));
    if (data.data) {
      const formattingData = capitalizeUserPersonalData(data.data);

      yield put(setProfile(formattingData));
    }
  } catch (e) {
    errorHandler(e, 'getProfileAsync');
  }
}

export function* deleteProfileAsync() {
  try {
    yield put(setLoader(true));
    const {data} = yield call(() => httpDel(urls.deleteProfile));
    if (data.success) {
      yield put(setFaceIdActiveLocal(false));
      yield ReactNativeBiometrics.deleteKeys();
      yield put(resetNotifications());
      yield put(logout());
    }
  } catch (e) {
    errorHandler(e, 'deleteProfileAsync');
  } finally {
    yield put(setLoader(false));
  }
}
