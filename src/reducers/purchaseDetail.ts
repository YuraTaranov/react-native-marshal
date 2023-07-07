import {takeLatest, put, call, select, delay} from 'redux-saga/effects';
import {setLoader} from './appGlobalState';
import {httpGet, httpPost, navigate, errorHandler} from '@services';
import {urls} from '@constants';
import {IGetPurchaseDetail, ISetPurchaseDetail, TGlobalState} from '@types';

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
  // const { accessToken } = yield select(state => state.profile)
  // yield put(setLoader(true));
  try {
    console.log(action.data);
    yield delay(2000);
    yield put(
      setPurchaseDetail([
        {
          id: '1',
          name: 'Первый товар',
          quantity: 1,
          price: 100,
          amount: 100,
          discountAmount: 10,
        },
        {
          id: '2',
          name: 'Второй товар',
          quantity: 2,
          price: 100,
          amount: 200,
          discountAmount: 0,
        },
        {
          id: '3',
          name: 'Третий товар',
          quantity: 2,
          price: 100,
          amount: 200,
          discountAmount: 0,
        },
        {
          id: '4',
          name: 'четвертый товар',
          quantity: 2,
          price: 100,
          amount: 200,
          discountAmount: 0,
        },
        {
          id: '5',
          name: 'пятый товар',
          quantity: 2,
          price: 100,
          amount: 200,
          discountAmount: 0,
        },
        {
          id: '6',
          name: 'шестой товар',
          quantity: 2,
          price: 100,
          amount: 200,
          discountAmount: 0,
        },
        {
          id: '7',
          name: 'седьмой товар',
          quantity: 2,
          price: 100,
          amount: 200,
          discountAmount: 0,
        },
      ]),
    );

    // const body = yield call(() => httpGet(urls.url));
    // yield put(setLoader(false));
    // if (body.data) {
    //   yield put(setPurchaseDetail(body.data));
    //   // navigate('Route');
    // }
  } catch (e) {
    // yield put(setLoader(false));
    errorHandler(e, 'getPurchaseDetailAsync');
  } finally {
    yield put(setLoading(false));
  }
}
