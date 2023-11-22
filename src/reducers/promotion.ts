import {takeLatest, put, call, select} from 'redux-saga/effects';
import {setLoader} from './appGlobalState';
import {httpGet, navigate, errorHandler} from '@services';
import {urls} from '@constants';
import {Alert} from '@components';
import i18next from 'i18next';

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

export const getPromotion = (data: {id: number; item?: any}) => ({
  data,
  type: GET_PROMOTION,
});
export const setPromotion = (data: any) => ({data, type: SET_PROMOTION});
export const resetPromotion = () => ({type: RESET_PROMOTION});

export function* watchPromotion() {
  yield takeLatest(GET_PROMOTION, getPromotionAsync);
}

export function* getPromotionAsync(action: any) {
  yield put(setLoader(true));
  const {lang} = yield select(state => state.appGlobalState);
  const locale = lang === 'uk' || lang === 'ru' ? 'ua' : lang;
  try {
    const body = yield call(() =>
      httpGet(`${urls.getPromotions}/${action.data.id}/?locale=${locale}`),
    );
    yield put(setLoader(false));
    if (body.data.data) {
      yield put(setPromotion(body.data.data));
      navigate('PromotionsStack', {
        screen: 'Promotion',
        params: action.data.item,
      });
    }
  } catch (e: any) {
    if (
      e &&
      e?.data &&
      e?.data?.message?.startsWith('No query results for model')
    ) {
      return Alert.alert(
        '',
        i18next.t('Эта акция устарела или временно недоступна'),
      );
    } else {
      errorHandler(e, 'getPromotionAsync');
    }
  } finally {
    yield put(setLoader(false));
  }
}
