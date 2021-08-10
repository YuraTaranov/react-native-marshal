import {takeLatest, put, call} from 'redux-saga/effects';
import {
  httpGet,
  errorHandler,
  httpPost,
  goBack,
  httpDel,
  httpPut,
} from '@services';
import {urls} from '@constants';
import {TCarTank} from '@types';
import {getCars} from './cars';
import {setLoader} from './appGlobalState';

const GET_BRANDS_CAR = '[addCar] GET_BRANDS_CAR';
const GET_MODELS_CAR = '[addCar] GET_MODELS_CAR';
const GET_TANK_CAR = '[addCar] GET_TANK_CAR';
const SET_BRANDS_CAR = '[addCar] SET_BRANDS_CAR';
const SET_MODELS_CAR = '[addCar] SET_MODELS_CAR';
const SET_TANK_CAR = '[addCar] SET_TANK_CAR';
const SET_LOADING = '[addCar] SET_LOADING';
const ADD_CAR = '[addCar] ADD_CAR';
const DELETE_CAR = '[addCar] DELETE_CAR';
const RESET_ADD_CAR = '[addCar] RESET_ADD_CAR';

const initialstate = {
  brands: [],
  models: [],
  tank: [],
  loading: false,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_BRANDS_CAR:
      return Object.assign({}, {...state, brands: action.data});
    case SET_MODELS_CAR:
      return Object.assign({}, {...state, models: action.data});
    case SET_TANK_CAR:
      return Object.assign({}, {...state, tank: action.data});
    case SET_LOADING:
      return Object.assign({}, {...state, loading: action.data});
    case RESET_ADD_CAR:
      return initialstate;
    default:
      return state;
  }
};

export const getBrandsCar = () => ({type: GET_BRANDS_CAR});
export const getModelsCar = (data: any) => ({data, type: GET_MODELS_CAR});
export const getTankCar = () => ({type: GET_TANK_CAR});
export const setBrandsCar = (data: any) => ({data, type: SET_BRANDS_CAR});
export const setModelsCar = (data: any) => ({data, type: SET_MODELS_CAR});
export const setTankCar = (data: any) => ({data, type: SET_TANK_CAR});
export const setLoading = (data: boolean) => ({data, type: SET_LOADING});
export const addCar = (data: any) => ({data, type: ADD_CAR});
export const deleteCar = (data: any) => ({data, type: DELETE_CAR});
export const resetAddCar = () => ({type: RESET_ADD_CAR});

export function* watchAddCar() {
  yield takeLatest(GET_BRANDS_CAR, getBrandsCarAsync);
  yield takeLatest(GET_MODELS_CAR, getModelsCarAsync);
  yield takeLatest(GET_TANK_CAR, getTankCarAsync);
  yield takeLatest(ADD_CAR, addCarAsync);
  yield takeLatest(DELETE_CAR, deleteCarAsync);
}

export function* getBrandsCarAsync() {
  yield put(setLoading(true));
  try {
    const body = yield call(() => httpGet(urls.getBrands));
    yield put(setLoading(false));
    if (body.data.data) {
      yield put(setBrandsCar(body.data.data));
    }
  } catch (e) {
    yield put(setLoading(false));
    errorHandler(e, 'getBrandsCarAsync');
  }
}

export function* getModelsCarAsync(action: any) {
  yield put(setLoading(true));
  try {
    const body = yield call(() =>
      httpGet(`${urls.getModels}?car_brand_id=${action.data}`),
    );
    yield put(setLoading(false));
    if (body.data.data) {
      yield put(setModelsCar(body.data.data));
    }
  } catch (e) {
    yield put(setLoading(false));
    errorHandler(e, 'getModelsCarAsync');
  }
}

export function* getTankCarAsync() {
  yield put(setLoading(true));
  try {
    const body = yield call(() => httpGet(urls.getTank));
    yield put(setLoading(false));
    if (body.data.data) {
      yield put(
        setTankCar(
          body.data.data.map((item: TCarTank) => {
            return {
              id: item.id,
              name: String(item.tank),
            };
          }),
        ),
      );
    }
  } catch (e) {
    yield put(setLoading(false));
    errorHandler(e, 'getTankCarAsync');
  }
}

export function* addCarAsync(action: any) {
  yield put(setLoader(true));
  try {
    const body = action.data.carToEditId
      ? yield call(() =>
          httpPut(`${urls.addCar}/${action.data.carToEditId}`, {
            car_brand_id: action.data.brand.id,
            car_model_id: action.data.model.id,
            year: action.data.year.id,
            car_tank_id: action.data.tank.id,
          }),
        )
      : yield call(() =>
          httpPost(urls.addCar, {
            car_brand_id: action.data.brand.id,
            car_model_id: action.data.model.id,
            year: action.data.year.id,
            car_tank_id: action.data.tank.id,
          }),
        );
    if (body.data.massage === 'OK') {
      yield put(getCars());
      goBack();
    }
  } catch (e) {
    yield put(setLoader(false));
    errorHandler(e, 'addCarAsync');
  }
}

export function* deleteCarAsync(action: any) {
  yield put(setLoader(true));
  try {
    const body = yield call(() => httpDel(`${urls.deleteCar}/${action.data}`));
    if (body.data.massage === 'OK') {
      yield put(getCars());
      goBack();
    }
  } catch (e) {
    yield put(setLoading(false));
    errorHandler(e, 'deleteCarAsync');
  }
}
