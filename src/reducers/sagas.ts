import {all} from 'redux-saga/effects';
// ADD IMPORT
import { watchLogout } from './logout'
import { watchProfile } from './profile'
import { watchLogin } from './login'
import {watchAppGlobalState} from './appGlobalState';

export default function* rootSaga() {
  yield all([
    // ADD WATCHER
		watchLogout(),
		watchProfile(),
		watchLogin(),
    watchAppGlobalState(),
  ]);
}
