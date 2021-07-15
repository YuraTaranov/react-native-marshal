import {all} from 'redux-saga/effects';
// ADD IMPORT
import {watchAppGlobalState} from './appGlobalState';

export default function* rootSaga() {
  yield all([
    // ADD WATCHER
    watchAppGlobalState(),
  ]);
}
