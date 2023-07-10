import {takeLatest, put, call} from 'redux-saga/effects';
import {errorHandler} from '@services';
import {
  IGetPurchaseDetail,
  ISetPurchaseDetail,
  TGlobalState,
  TPurchaseDetailResponse,
} from '@types';
import {PurchaseService} from '@httpServices';

const GET_PURCHASE_DETAIL = '[purchaseDetail] GET_PURCHASE_DETAIL';
const SET_PURCHASE_DETAIL = '[purchaseDetail] SET_PURCHASE_DETAIL';
const RESET_PURCHASE_DETAIL = '[purchaseDetail] RESET_PURCHASE_DETAIL';
const SET_LOADING = '[purchaseDetail] SET_LOADING';

const initialstate: TGlobalState['purchaseDetail'] = {
  data: [],
  loading: true,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_PURCHASE_DETAIL:
      return Object.assign({}, {...state, data: action.data});
    case SET_LOADING:
      return Object.assign({}, {...state, loading: action.data});
    case RESET_PURCHASE_DETAIL:
      return initialstate;
    default:
      return state;
  }
};

export const setLoading = (data: boolean) => ({data, type: SET_LOADING});
export const getPurchaseDetail = (data: IGetPurchaseDetail['data']) => ({
  data,
  type: GET_PURCHASE_DETAIL,
});
export const setPurchaseDetail = (data: ISetPurchaseDetail['data']) => ({
  data,
  type: SET_PURCHASE_DETAIL,
});
export const resetPurchaseDetail = () => ({type: RESET_PURCHASE_DETAIL});

export function* watchPurchaseDetail() {
  yield takeLatest(GET_PURCHASE_DETAIL, getPurchaseDetailAsync);
}

export function* getPurchaseDetailAsync(action: IGetPurchaseDetail) {
  try {
    const {data}: TPurchaseDetailResponse = yield call(() =>
      PurchaseService.getPurchaseDetail(action.data),
    );
    if (data.data.length) {
      yield put(setPurchaseDetail(data.data));
    }
  } catch (e) {
    errorHandler(e, 'getPurchaseDetailAsync');
  } finally {
    yield put(setLoading(false));
  }
}
