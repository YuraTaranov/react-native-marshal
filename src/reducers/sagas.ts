import {all} from 'redux-saga/effects';
// ADD IMPORT
import { watchProfile } from './profile'
import { watchLogin } from './login'
import {watchAppGlobalState} from './appGlobalState';

export default function* rootSaga() {
  yield all([
    // ADD WATCHER
		watchProfile(),
		watchLogin(),
    watchAppGlobalState(),
  ]);
}
