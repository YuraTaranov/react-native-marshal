import {takeLatest, put, call, select} from 'redux-saga/effects';
import {httpGet, errorHandler} from '@services';
import {urls} from '@constants';

const GET_PURCHASES = '[purchases] GET_PURCHASES';
const SET_PURCHASES = '[purchases] SET_PURCHASES';
const SET_LAZY_LOADING = '[operations] SET_LAZY_LOADING';
const SET_REFRESHING = '[operations] SET_REFRESHING';
const SET_FINISH_LOADING = '[operations] SET_FINISH_LOADING';
const RESET_PURCHASES = '[purchases] RESET_PURCHASES';

const initialstate = {
  data: [],
  lazyLoading: false,
  finishLoading: false,
  refreshing: false,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_PURCHASES:
      return Object.assign({}, {...state, data: action.data});
    case SET_LAZY_LOADING:
      return Object.assign({}, {...state, lazyLoading: action.data});
    case SET_REFRESHING:
      return Object.assign({}, {...state, refreshing: action.data});
    case SET_FINISH_LOADING:
      return Object.assign({}, {...state, finishLoading: action.data});
    case RESET_PURCHASES:
      return initialstate;
    default:
      return state;
  }
};

export const getPurchases = (data: any) => ({data, type: GET_PURCHASES});
export const setPurchases = (data: any) => ({data, type: SET_PURCHASES});
export const setLazyLoading = (data: boolean) => ({
  data,
  type: SET_LAZY_LOADING,
});
export const setRefreshing = (data: boolean) => ({data, type: SET_REFRESHING});
export const setFinishLoading = (data: boolean) => ({
  data,
  type: SET_FINISH_LOADING,
});
export const resetPurchases = () => ({type: RESET_PURCHASES});

export function* watchPurchases() {
  yield takeLatest(GET_PURCHASES, getPurchasesAsync);
}

export function* getPurchasesAsync(action: any) {
  const purchases = yield select(state => state.purchases.data);
  try {
    const body = yield call(() =>
      httpGet(`${urls.getPurchases}?page=${action.data.page}`),
    );
    if (body.data.data.length < 10) {
      yield put(setFinishLoading(true));
    } else {
      yield put(setFinishLoading(false));
    }
    if (action.data.page === 1) {
      yield put(setPurchases(body.data.data));
    } else {
      yield body.data.length &&
        put(setPurchases([...purchases, ...body.data.data]));
    }
    yield put(setLazyLoading(false));
    yield put(setRefreshing(false));
  } catch (e) {
    errorHandler(e, 'getPurchasesAsync');
  }
}
