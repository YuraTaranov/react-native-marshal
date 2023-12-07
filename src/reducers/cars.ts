import {takeLatest, put, call} from 'redux-saga/effects';
import {setLoader} from './appGlobalState';
import {httpGet, navigate, errorHandler} from '@services';
import {urls} from '@constants';

const GET_CARS = '[cars] GET_CARS';
const SET_CARS = '[cars] SET_CARS';
const RESET_CARS = '[cars] RESET_CARS';

const initialstate = {};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_CARS:
      return Object.assign({}, {...state, data: action.data});
    case RESET_CARS:
      return initialstate;
    default:
      return state;
  }
};

export const getCars = () => ({type: GET_CARS});
export const setCars = (data: any) => ({data, type: SET_CARS});
export const resetCars = () => ({type: RESET_CARS});

export function* watchCars() {
  yield takeLatest(GET_CARS, getCarsAsync);
}

export function* getCarsAsync() {
  yield put(setLoader(true));
  try {
    const body = yield call(() => httpGet(urls.cars));
    yield put(setLoader(false));
    if (body.data.data) {
      yield put(setCars(body.data.data));
      navigate('ProfileStack', {
		  screen: 'Cars',
	  });
    }
  } catch (e) {
    yield put(setLoader(false));
    errorHandler(e, 'getCarsAsync');
  }
}
