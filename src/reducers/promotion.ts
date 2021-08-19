import {takeLatest, put, call, select} from 'redux-saga/effects';
import {setLoader} from './appGlobalState';
import {httpGet, navigate, errorHandler} from '@services';
import {urls} from '@constants';

const GET_PROMOTION = '[promotion] GET_PROMOTION';
const SET_PROMOTION = '[promotion] SET_PROMOTION';
const RESET_PROMOTION = '[promotion] RESET_PROMOTION';

const initialstate = {};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_PROMOTION:
      return Object.assign({}, {...state, data: action.data});
    case RESET_PROMOTION:
      return initialstate;
    default:
      return state;
  }
};

export const getPromotion = (data: number) => ({data, type: GET_PROMOTION});
export const setPromotion = (data: any) => ({data, type: SET_PROMOTION});
export const resetPromotion = () => ({type: RESET_PROMOTION});

export function* watchPromotion() {
  yield takeLatest(GET_PROMOTION, getPromotionAsync);
}

export function* getPromotionAsync(action: any) {
  // yield put(setLoader(true));
  const {lang} = yield select(state => state.appGlobalState);
  const locale = lang === 'uk' ? 'ua' : lang; /// До выяснения этой несостыковки
  try {
    const body = yield call(() =>
      httpGet(`${urls.gePromotions}/${action.data}/?locale=${locale}`),
    );
    yield put(setLoader(false));
    if (body.data.data) {
      yield put(setPromotion(body.data.data));
      navigate('Promotion');
    }
  } catch (e) {
    yield put(setLoader(false));
    errorHandler(e, 'getPromotionAsync');
  }
}
