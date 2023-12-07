import {takeLatest, put, call, select} from 'redux-saga/effects';
import {httpGet, errorHandler} from '@services';
import {urls} from '@constants';

const GET_PROMOTIONS_MAIN = '[promotionsMain] GET_PROMOTIONS_MAIN';
const SET_PROMOTIONS_MAIN = '[promotionsMain] SET_PROMOTIONS_MAIN';
const SET_REFRESHING = '[promotionsMain] SET_REFRESHING';
const RESET_PROMOTIONS_MAIN = '[promotionsMain] RESET_PROMOTIONS_MAIN';

const initialstate = {
  data: [],
  refreshing: false,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_PROMOTIONS_MAIN:
      return Object.assign({}, {...state, data: action.data});
    case SET_REFRESHING:
      return Object.assign({}, {...state, refreshing: action.data});
    case RESET_PROMOTIONS_MAIN:
      return initialstate;
    default:
      return state;
  }
};

export const getPromotionsMain = () => ({type: GET_PROMOTIONS_MAIN});
export const setPromotionsMain = (data: any) => ({
  data,
  type: SET_PROMOTIONS_MAIN,
});
export const setRefreshing = (data: boolean) => ({data, type: SET_REFRESHING});
export const resetPromotionsMain = () => ({type: RESET_PROMOTIONS_MAIN});

export function* watchPromotionsMain() {
  yield takeLatest(GET_PROMOTIONS_MAIN, getPromotionsMainAsync);
}

export function* getPromotionsMainAsync() {
  yield put(setRefreshing(true));
  const {lang} = yield select(state => state.appGlobalState);
  const locale = lang === 'uk' || lang === 'ru' ? 'ua' : lang;
  try {
    const body = yield call(() =>
      httpGet(`${urls.getPromotionsMain}/?locale=${locale}`),
    );
    if (body.data.data) {
      yield put(setPromotionsMain(body.data.data));
    }
  } catch (e) {
    errorHandler(e, 'getPromotionsMainAsync');
  } finally {
    yield put(setRefreshing(false));
  }
}
