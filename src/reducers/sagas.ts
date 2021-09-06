import {all} from 'redux-saga/effects';
// ADD IMPORT
import { watchNotifications } from './notifications'
import {watchAddCar} from './addCar';
import {watchAppGlobalState} from './appGlobalState';
import {watchCars} from './cars';
import {watchLogin} from './login';
import {watchLogout} from './logout';
import {watchPetrolStations} from './petrolStations';
import {watchProfile} from './profile';
import {watchPromotions} from './promotions';
import {watchPromotion} from './promotion';
import {watchPurchases} from './purchases';

export default function* rootSaga() {
  yield all([
    // ADD WATCHER
		watchNotifications(),
    watchAddCar(),
    watchAppGlobalState(),
    watchCars(),
    watchLogin(),
    watchLogout(),
    watchPetrolStations(),
    watchProfile(),
    watchPromotion(),
    watchPromotions(),
    watchPurchases(),
  ]);
}
