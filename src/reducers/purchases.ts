import {takeLatest, put, call, select} from 'redux-saga/effects';
import {errorHandler} from '@services';
import {PurchaseService} from '@httpServices';
import {
  IGetPurchases,
  ISetPurchases,
  ISetPurchasesFinishLoading,
  ISetPurchasesLazyLoading,
  ISetPurchasesRefreshing,
  TPurchasesResponse,
  TSectionListItem,
} from '@types';
import {generateSectionListData} from '@helpers';

const GET_PURCHASES = '[purchases] GET_PURCHASES';
const SET_PURCHASES = '[purchases] SET_PURCHASES';
const SET_LAZY_LOADING = '[operations] SET_LAZY_LOADING';
const SET_REFRESHING = '[operations] SET_REFRESHING';
const SET_FINISH_LOADING = '[operations] SET_FINISH_LOADING';
const RESET_PURCHASES = '[purchases] RESET_PURCHASES';
const SET_LOADING = '[purchases] SET_LOADING';

const initialstate = {
  data: [],
  lazyLoading: false,
  finishLoading: false,
  refreshing: false,
  loading: true,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_PURCHASES:
      return Object.assign({}, {...state, data: action.data});
    case SET_LAZY_LOADING:
      return Object.assign({}, {...state, lazyLoading: action.data});
    case SET_REFRESHING:
      return Object.assign({}, {...state, refreshing: action.data});
    case SET_LOADING:
      return Object.assign({}, {...state, loading: action.data});
    case SET_FINISH_LOADING:
      return Object.assign({}, {...state, finishLoading: action.data});
    case RESET_PURCHASES:
      return initialstate;
    default:
      return state;
  }
};

export const setLoading = (data: boolean) => ({data, type: SET_LOADING});

export const getPurchases = (data: IGetPurchases['data']) => ({
  data,
  type: GET_PURCHASES,
});
export const setPurchases = (data: ISetPurchases['data']) => ({
  data,
  type: SET_PURCHASES,
});
export const setLazyLoading = (data: ISetPurchasesLazyLoading['data']) => ({
  data,
  type: SET_LAZY_LOADING,
});
export const setRefreshing = (data: ISetPurchasesRefreshing['data']) => ({
  data,
  type: SET_REFRESHING,
});
export const setFinishLoading = (data: ISetPurchasesFinishLoading['data']) => ({
  data,
  type: SET_FINISH_LOADING,
});
export const resetPurchases = () => ({type: RESET_PURCHASES});

export function* watchPurchases() {
  yield takeLatest(GET_PURCHASES, getPurchasesAsync);
}

export function* getPurchasesAsync(action: any) {
  const purchases: TSectionListItem[] = yield select(
    state => state.purchases.data,
  );
  yield put(setLoading(true));
  try {
    const {data}: TPurchasesResponse = yield call(() =>
      PurchaseService.getPurchases(action.data),
    );
    const {transactions} = yield data.data;

    if (transactions.length < 15) {
      yield put(setFinishLoading(true));
    } else {
      yield put(setFinishLoading(false));
    }

    const result: TSectionListItem[] = yield generateSectionListData(
      transactions,
    );
    if (action.data === 1) {
      yield put(setPurchases(result));
    } else {
      if (transactions.length) {
        if (purchases[purchases.length - 1].title === result[0].title) {
          const purchasesResult: TSectionListItem[] = yield [
            ...purchases.slice(0, purchases.length - 1),
            {
              title: result[0].title,
              data: [
                ...purchases[purchases.length - 1].data,
                ...result[0].data,
              ],
            },
          ];
          yield put(setPurchases(purchasesResult.concat(result.slice(1))));
        } else {
          yield put(setPurchases([...purchases, ...result]));
        }
      }
    }
    yield put(setLazyLoading(false));
    yield put(setRefreshing(false));
  } catch (e) {
    errorHandler(e, 'getPurchasesAsync');
  } finally {
    yield put(setLoading(false));
  }
}
