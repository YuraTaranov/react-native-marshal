import {all} from 'redux-saga/effects';
// ADD IMPORT
import { watchPromotion } from './promotion'
import { watchPromotions } from './promotions'
import { watchAddCar } from './addCar'
import { watchCars } from './cars'
import { watchPurchases } from './purchases'
import { watchLogout } from './logout'
import { watchProfile } from './profile'
import { watchLogin } from './login'
import {watchAppGlobalState} from './appGlobalState';

export default function* rootSaga() {
  yield all([
    // ADD WATCHER
		watchPromotion(),
		watchPromotions(),
		watchAddCar(),
		watchCars(),
		watchPurchases(),
		watchLogout(),
		watchProfile(),
		watchLogin(),
    watchAppGlobalState(),
  ]);
}
