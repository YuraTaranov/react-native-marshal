import {takeLatest, put, call, select} from 'redux-saga/effects';
import {httpGet, errorHandler} from '@services';
import {urls} from '@constants';

const GET_PROMOTIONS = '[promotions] GET_PROMOTIONS';
const SET_PROMOTIONS = '[promotions] SET_PROMOTIONS';
const SET_LAZY_LOADING = '[operations] SET_LAZY_LOADING';
const SET_REFRESHING = '[operations] SET_REFRESHING';
const SET_FINISH_LOADING = '[operations] SET_FINISH_LOADING';
const RESET_PROMOTIONS = '[promotions] RESET_PROMOTIONS';

const initialstate = {
  data: [],
  lazyLoading: false,
  finishLoading: false,
  refreshing: false,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_PROMOTIONS:
      return Object.assign({}, {...state, data: action.data});
    case SET_LAZY_LOADING:
      return Object.assign({}, {...state, lazyLoading: action.data});
    case SET_REFRESHING:
      return Object.assign({}, {...state, refreshing: action.data});
    case SET_FINISH_LOADING:
      return Object.assign({}, {...state, finishLoading: action.data});
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
export const setFinishLoading = (data: boolean) => ({
  data,
  type: SET_FINISH_LOADING,
});
export const resetPromotions = () => ({type: RESET_PROMOTIONS});

export function* watchPromotions() {
  yield takeLatest(GET_PROMOTIONS, getPromotionsAsync);
}
type TAnswer = {
  data: {
    data: Array<Object>;
  };
  status: number;
  statusText: string;
};
export function* getPromotionsAsync(action: any) {
  const {lang} = yield select(state => state.appGlobalState);
  const locale = lang === 'uk' ? 'ua' : lang; /// До выяснения этой несостыковки

  try {
    const body: TAnswer = yield call(() =>
      httpGet(`${urls.gePromotions}/?locale=${locale}`),
    );

    if (body.data.data) {
      yield put(setPromotions(body.data.data));
    }

    // FIXME:
    // const body = yield call(() => httpGet(`${urls.gePromotions}?page=${action.data.page}`));
    // if (body.data.length < 20) {
    // 	yield put(setFinishLoading(true));
    //   } else {
    // 	yield put(setFinishLoading(false));
    //   }
    //   if (action.data.page === 1) {
    // 	yield put(setPromotions(body.data));
    //   } else {
    // 	yield body.data.length && put(setPromotions([...promotions, ...body.data]));
    //   }
    //   yield put(setLazyLoading(false));
    //   yield put(setRefreshing(false));
  } catch (e) {
    errorHandler(e, 'getPromotionsAsync');
  }
}
