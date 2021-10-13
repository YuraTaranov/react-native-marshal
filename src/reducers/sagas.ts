import {all} from 'redux-saga/effects';
// ADD IMPORT
import { watchFuel } from './fuel'
import { watchFuelCalculator } from './fuelCalculator'
import { watchPromotionsMain } from './promotionsMain'
import { watchReferral } from './referral'
import { watchSettings } from './settings'
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
		watchFuel(),
		watchFuelCalculator(),
		watchPromotionsMain(),
		watchReferral(),
		watchSettings(),
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
