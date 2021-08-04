import {takeLatest, put, call, select} from 'redux-saga/effects';
import {setLoader} from './appGlobalState';
import {Alert} from 'react-native';
import i18next from 'i18next';
import {httpGet, httpPost, navigate} from '@services';
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
  // const { accessToken } = yield select(state => state.profile)
  yield put(setLoader(true));
  try {
    const body = yield call(() => httpGet(urls.url));
    yield put(setLoader(false));
    if (body.data) {
      yield put(setProfile(body.data));
      // navigate('Route');
    }
  } catch (e) {
    yield put(setLoader(false));
    if (e.status === 418) {
      Alert.alert(
        '',
        i18next.t('Перевірте підключення до Інтернету або спробуйте пізніше'),
      );
    }
    console.log(e, 'getProfileAsync ERROR');
  }
}
