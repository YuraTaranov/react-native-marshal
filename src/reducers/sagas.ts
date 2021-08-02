import {all} from 'redux-saga/effects';
// ADD IMPORT
import { watchLogin } from './login'
import {watchAppGlobalState} from './appGlobalState';

export default function* rootSaga() {
  yield all([
    // ADD WATCHER
		watchLogin(),
    watchAppGlobalState(),
  ]);
}
