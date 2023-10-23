import {takeLatest, put, call} from 'redux-saga/effects';
import {setLoader} from './appGlobalState';
import {httpGet, errorHandler} from '@services';
import {urls} from '@constants';

const GET_CARDS = '[cars] GET_CARDS';
const SET_CARDS = '[cars] SET_CARDS';
const SET_CARDS_LOADER = '[cars] SET_CARDS_LOADER';
const RESET_CARDS = '[cars] RESET_CARDS';

const initialstate = {
  loading: true,
  data: [],
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_CARDS:
      return Object.assign({}, {...state, data: action.data, loading: false});
    case SET_CARDS_LOADER:
      return Object.assign({}, {...state, loading: action.data});
    case RESET_CARDS:
      return initialstate;
    default:
      return state;
  }
};

export const getCards = () => ({type: GET_CARDS});
export const setCards = (data: any) => ({data, type: SET_CARDS});
export const setCardsLoader = (data: any) => ({data, type: SET_CARDS_LOADER});
export const resetCards = () => ({type: RESET_CARDS});

export function* watchCards() {
  yield takeLatest(GET_CARDS, getCardsAsync);
}

export function* getCardsAsync() {
  yield put(setCardsLoader(true));
  try {
    const body = yield call(() => httpGet(urls.getQRCode));
    if (body?.data?.data) {
      yield put(setCards(body.data.data));
    }
  } catch (e) {
    errorHandler(e, 'getCarsAsync');
  } finally {
    yield put(setCardsLoader(false));
  }
}
