import {all} from 'redux-saga/effects';
// ADD IMPORT
import { watchDiscount } from './discount'
import { watchPurchaseDetail } from './purchaseDetail'
// import {watchPaymentСards} from './paymentСards';
import {watchFuel} from './fuel';
import {watchFuelCalculator} from './fuelCalculator';
import {watchPromotionsMain} from './promotionsMain';
import {watchReferral} from './referral';
import {watchSettings} from './settings';
import {watchNotifications} from './notifications';
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
import {watchCreditCards} from './creditCards';

export default function* rootSaga() {
  yield all([
    // ADD WATCHER
		watchDiscount(),
		watchPurchaseDetail(),
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
    watchCreditCards(),
  ]);
}
