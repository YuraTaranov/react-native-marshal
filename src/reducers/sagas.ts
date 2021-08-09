import {all} from 'redux-saga/effects';
// ADD IMPORT
import { watchPurchases } from './purchases'
import { watchLogout } from './logout'
import { watchProfile } from './profile'
import { watchLogin } from './login'
import {watchAppGlobalState} from './appGlobalState';

export default function* rootSaga() {
  yield all([
    // ADD WATCHER
		watchPurchases(),
		watchLogout(),
		watchProfile(),
		watchLogin(),
    watchAppGlobalState(),
  ]);
}
