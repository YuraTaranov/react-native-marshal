import {takeLatest, put, call, select} from 'redux-saga/effects';
import {setLoader} from './appGlobalState';
import {httpPost, errorHandler} from '@services';
import {urls} from '@constants';
import {TPetrolStation, TGetPetrolStationResponseGenerator} from '@types';

const GET_PETROL_STATIONS = '[petrolStations] GET_PETROL_STATIONS';
const SET_PETROL_STATIONS = '[petrolStations] SET_PETROL_STATIONS';
const SET_LOADING = '[petrolStations] SET_LOADING';
const RESET_PETROL_STATIONS = '[petrolStations] RESET_PETROL_STATIONS';

type TInitial = {
  data: TPetrolStation[];
  loading: boolean;
};

const initstate: TInitial = {
  data: [],
  loading: false,
};

export default (state = initstate, action: any) => {
  switch (action.type) {
    case SET_PETROL_STATIONS:
      return Object.assign({}, {...state, data: action.data});
    case SET_LOADING:
      return Object.assign({}, {...state, loading: action.data});
    case RESET_PETROL_STATIONS:
      return initstate;
    default:
      return state;
  }
};

export const getPetrolStations = () => ({type: GET_PETROL_STATIONS});
export const setPetrolStations = (data: any) => ({
  data,
  type: SET_PETROL_STATIONS,
});
export const setLoading = (data: boolean) => ({data, type: SET_LOADING});
export const resetPetrolStations = () => ({type: RESET_PETROL_STATIONS});

export function* watchPetrolStations() {
  yield takeLatest(GET_PETROL_STATIONS, getPetrolStationsAsync);
}

export function* getPetrolStationsAsync() {
  const {lang} = yield select(state => state.appGlobalState);
  const locale = lang === 'uk' ? 'ua' : lang;
  yield put(setLoading(true));
  try {
    const body: TGetPetrolStationResponseGenerator = yield call(() =>
      httpPost(urls.getPetrolStations, {locale}),
    );
    if (body?.data?.data) {
      yield put(setPetrolStations(body.data.data));
    }
  } catch (e) {
    yield put(setLoader(false));
    errorHandler(e, 'getPetrolStationsAsync');
  } finally {
    yield put(setLoading(false));
  }
}
