import {takeLatest, put, call, select, all} from 'redux-saga/effects';
import {setLoader} from './appGlobalState';
import {httpGet, httpPost, navigate, errorHandler} from '@services';
import {urls} from '@constants';
import {DiscountService} from '@httpServices';
import {
  EFuel,
  EFuelTitle,
  TDiscountResponse,
  TFuelData,
  TGlobalState,
} from '@types';
import {ISetDiscount} from 'src/types/actions/discount';

const GET_DISCOUNT = '[discount] GET_DISCOUNT';
const SET_DISCOUNT = '[discount] SET_DISCOUNT';
const RESET_DISCOUNT = '[discount] RESET_DISCOUNT';

const FUEL_INITIAL_STATE = {
  type: 0,
  discount: 0,
  next_discount: 0,
  quantity: 0,
  date: '',
};
const initialstate: TGlobalState['discount'] = {
  petrol: {...FUEL_INITIAL_STATE, title: 'petrol'},
  gas: {...FUEL_INITIAL_STATE, title: 'gas'},
  diesel: {...FUEL_INITIAL_STATE, title: 'diesel'},
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_DISCOUNT:
      return Object.assign(
        {},
        {...state, [action.data.type]: action.data.data},
      );
    case RESET_DISCOUNT:
      return initialstate;
    default:
      return state;
  }
};

export const getDiscount = () => ({type: GET_DISCOUNT});
export const setDiscount = (data: ISetDiscount['data']) => ({
  data,
  type: SET_DISCOUNT,
});
export const resetDiscount = () => ({type: RESET_DISCOUNT});

export function* watchDiscount() {
  yield takeLatest(GET_DISCOUNT, getDiscountAsync);
}

export function* getDiscountAsync() {
  // const { accessToken } = yield select(state => state.profile)
  yield put(setLoader(true));
  try {
    const [diesel, petrol, gas]: TDiscountResponse[] = yield all([
      call(() => DiscountService.getDiscount(EFuel.DIESEL)),
      call(() => DiscountService.getDiscount(EFuel.PETROL)),
      call(() => DiscountService.getDiscount(EFuel.GAS)),
    ]);

    yield put(
      setDiscount({
        type: EFuelTitle.GAS,
        data: {...gas.data.data, title: EFuelTitle.GAS},
      }),
    );
    yield put(
      setDiscount({
        type: EFuelTitle.PETROL,
        data: {...petrol.data.data, title: EFuelTitle.PETROL},
      }),
    );
    yield put(
      setDiscount({
        type: EFuelTitle.DIESEL,
        data: {...diesel.data.data, title: EFuelTitle.DIESEL},
      }),
    );
  } catch (e) {
    errorHandler(e, 'getDiscountAsync');
  } finally {
    yield put(setLoader(false));
  }
}
