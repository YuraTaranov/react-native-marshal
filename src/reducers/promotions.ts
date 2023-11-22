import {takeLatest, put, call, select} from 'redux-saga/effects';
import {httpGet, errorHandler} from '@services';
import {urls} from '@constants';

const GET_PROMOTIONS = '[promotions] GET_PROMOTIONS';
const SET_PROMOTIONS = '[promotions] SET_PROMOTIONS';
const SET_LAZY_LOADING = '[operations] SET_LAZY_LOADING';
const SET_REFRESHING = '[operations] SET_REFRESHING';
const SET_END_LOADING = '[operations] SET_END_LOADING';
const RESET_PROMOTIONS = '[promotions] RESET_PROMOTIONS';

const initialstate = {
  data: [],
  lazyLoading: false,
  refreshing: false,
  endLoading: false,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_PROMOTIONS:
      return Object.assign({}, {...state, data: action.data});
    case SET_LAZY_LOADING:
      return Object.assign({}, {...state, lazyLoading: action.data});
    case SET_REFRESHING:
      return Object.assign({}, {...state, refreshing: action.data});
    case SET_END_LOADING:
      return Object.assign({}, {...state, endLoading: action.data});
    case RESET_PROMOTIONS:
      return initialstate;
    default:
      return state;
  }
};

export const getPromotions = (data: any) => ({data, type: GET_PROMOTIONS});
export const setPromotions = (data: any) => ({data, type: SET_PROMOTIONS});
export const setLazyLoading = (data: boolean) => ({
  data,
  type: SET_LAZY_LOADING,
});
export const setRefreshing = (data: boolean) => ({data, type: SET_REFRESHING});
export const setEndLoading = (data: boolean) => ({
  data,
  type: SET_END_LOADING,
});
export const resetPromotions = () => ({type: RESET_PROMOTIONS});

export function* watchPromotions() {
  yield takeLatest(GET_PROMOTIONS, getPromotionsAsync);
}

export function* getPromotionsAsync(action: any) {
  const promotions = yield select(state => state.promotions.data);
  const {lang} = yield select(state => state.appGlobalState);
  const locale = lang === 'uk' || lang === 'ru' ? 'ua' : lang;
  try {
    const body = yield call(() =>
      httpGet(
        `${urls.getPromotions}/?locale=${locale}&page=${action.data.page}`,
      ),
    );
    if (body.data.data.length < 5) {
      yield put(setEndLoading(true));
    } else {
      yield put(setEndLoading(false));
    }
    if (action.data.page === 1) {
      yield put(setPromotions(body.data.data));
    } else {
      if (body.data.data.length) {
        yield put(setPromotions([...promotions, ...body.data.data]));
      }
    }
    yield put(setLazyLoading(false));
    yield put(setRefreshing(false));
  } catch (e) {
    errorHandler(e, 'getPromotionsAsync');
  }
}
