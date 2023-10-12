import {takeLatest, put, call} from 'redux-saga/effects';
import {httpGet, errorHandler} from '@services';
import {urls} from '@constants';
import { TGlobalState } from '@types';

const GET_FUEL = '[fuel] GET_FUEL';
const SET_FUEL = '[fuel] SET_FUEL';
const RESET_FUEL = '[fuel] RESET_FUEL';

const initialstate:TGlobalState["fuel"] = {
  data: [],
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_FUEL:
      return Object.assign({}, {...state, data: action.data});
    case RESET_FUEL:
      return initialstate;
    default:
      return state;
  }
};

export const getFuel = () => ({type: GET_FUEL});
export const setFuel = (data: any) => ({data, type: SET_FUEL});
export const resetFuel = () => ({type: RESET_FUEL});

export function* watchFuel() {
  yield takeLatest(GET_FUEL, getFuelAsync);
}

export function* getFuelAsync() {
  try {
    const body = yield call(() => httpGet(urls.getFuel));
    if (body.data.data) {
      yield put(setFuel(body.data.data));
    }
  } catch (e) {
    errorHandler(e, 'getFuelAsync');
  }
}
