/* eslint-disable @typescript-eslint/no-unused-vars */
import {takeLatest, put, call, select} from 'redux-saga/effects';
import {setLoader} from './appGlobalState';
// import i18next from 'i18next';
import {httpPost, errorHandler} from '@services';
import {urls} from '@constants';
import {TPetrolStation, TGetPetrolStationResponseGenerator} from '@types';
// import {map} from '_templates/generate/component/prompt';

const GET_PETROL_STATIONS = '[petrolStations] GET_PETROL_STATIONS';
const SET_PETROL_STATIONS = '[petrolStations] SET_PETROL_STATIONS';
const RESET_PETROL_STATIONS = '[petrolStations] RESET_PETROL_STATIONS';

const initstate: TPetrolStation[] = [];

const filterDuplicatest = (
  newData: TPetrolStation[],
): Array<TPetrolStation> => {
//   const newMap = new Map();
//   newData.forEach(i => {
//     newMap.set(i.id, i);
//   });
//   return [...newMap].map(i => i[1] || null).filter(i => !!i);

	return Array.from(new Set(newData.map(i => JSON.stringify(i)))).map(i => JSON.parse(i));
};

export default (state = initstate, action: any) => {
  switch (action.type) {
    case SET_PETROL_STATIONS:
    //   return filterDuplicatest([...state, ...action.data]);
      return [...action.data];
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
export const resetPetrolStations = () => ({type: RESET_PETROL_STATIONS});

export function* watchPetrolStations() {
  yield takeLatest(GET_PETROL_STATIONS, getPetrolStationsAsync);
}

export function* getPetrolStationsAsync() {
  const {lang} = yield select(state => state.appGlobalState);
  const locale = lang === 'uk' ? 'ua' : lang;

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
  }
}
