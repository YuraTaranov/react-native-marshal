import {takeLatest, put, call, select, all} from 'redux-saga/effects';
import {setLoader} from './appGlobalState';
import {httpGet, httpPost, navigate, errorHandler} from '@services';
import {urls} from '@constants';
import {DiscountService} from '@httpServices';
import {EFuel, TDiscountResponse, TGlobalState} from '@types';

const GET_DISCOUNT = '[discount] GET_DISCOUNT';
const SET_DISCOUNT = '[discount] SET_DISCOUNT';
const RESET_DISCOUNT = '[discount] RESET_DISCOUNT';

const initialstate: TGlobalState['discount'] = {};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_DISCOUNT:
      return Object.assign({}, {...state, data: action.data});
    case RESET_DISCOUNT:
      return initialstate;
    default:
      return state;
  }
};

export const getDiscount = () => ({type: GET_DISCOUNT});
export const setDiscount = (data: any) => ({data, type: SET_DISCOUNT});
export const resetDiscount = () => ({type: RESET_DISCOUNT});

export function* watchDiscount() {
  yield takeLatest(GET_DISCOUNT, getDiscountAsync);
}

export function* getDiscountAsync() {
  // const { accessToken } = yield select(state => state.profile)
  yield put(setLoader(true));
  try {
    const {data}: TDiscountResponse = yield call(() =>
      DiscountService.getDiscount(EFuel.DIESEL),
    );
  } catch (e) {
    errorHandler(e, 'getDiscountAsync');
  } finally {
    yield put(setLoader(false));
  }
}
