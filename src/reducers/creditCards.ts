/* eslint-disable @typescript-eslint/no-unused-vars */
import {takeLatest, put, call, select} from 'redux-saga/effects';
import {
  TCreditCard,
  TGetPaymentСardsResponseGenerator,
  TPaymentСard,
  TPaymentСards,
} from '@types';
import {errorHandler, httpGet} from '@services';
import {urls} from '@constants';

const GET_CREDIT_CARDS = '[creditCards] GET_CREDIT_CARDS';
const SET_CREDIT_CARDS = '[creditCards] SET_CREDIT_CARDS';
const RESET_CREDIT_CARDS = '[creditCards] RESET_CREDIT_CARDS';
const SET_SELECTED_CREDIT_CARDS = '[creditCards] SET_SELECTED_CREDIT_CARDS';
const UNSET_SELECTED_ALL_CREDIT_CARDS =
  '[creditCards] UNSET_SELECTED_ALL_CREDIT_CARDS';

const initialstate: TPaymentСards = [];

const removeCardDublicat = (list: TPaymentСards): TPaymentСards => {
  const newMap = new Map();
  list.forEach(i => {
    newMap.set(i.rectoken, i);
  });
  return [...newMap].map(i => i[1] || null).filter(i => !!i);
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_CREDIT_CARDS:
      return removeCardDublicat(action.data);
    case SET_SELECTED_CREDIT_CARDS:
      return state.map((i: TPaymentСard) => {
        const obj = {...i};
        if (i.id === action.number) {
          obj.selected = true;
        } else {
          obj.selected = false;
        }
        return obj;
      });
    case UNSET_SELECTED_ALL_CREDIT_CARDS:
      return state.map((i: TPaymentСard) => {
        const obj = {...i};
        obj.selected = false;
        return obj;
      });
    case RESET_CREDIT_CARDS:
      return initialstate;
    default:
      return state;
  }
};

export const getCreditCards = () => ({type: GET_CREDIT_CARDS});
export const setCreditCards = (data: TPaymentСards) => ({
  data,
  type: SET_CREDIT_CARDS,
});
export const setSelectedCreditCards = (number: number) => ({
  number,
  type: SET_SELECTED_CREDIT_CARDS,
});
export const unSelectAllCreditCards = () => ({
  type: SET_SELECTED_CREDIT_CARDS,
});
export const resetCreditCards = () => ({type: RESET_CREDIT_CARDS});

export function* watchCreditCards() {
  yield takeLatest(GET_CREDIT_CARDS, getPaymentСardsAsync);
}

export function* getPaymentСardsAsync() {
  try {
    const body: TGetPaymentСardsResponseGenerator = yield call(() =>
      httpGet(urls.paymentСards),
    );
    if (body?.data?.data) {
      yield put(setCreditCards(body.data.data));
    }
  } catch (e) {
    errorHandler(e, 'getPaymentСardsAsync');
  }
}
