import { combineReducers } from 'redux';

export default combineReducers({
  appGlobalState: require('./appGlobalState').default,
  modalController: require('./modalController').default,
  // _additional: require('./_additional').default,
  // modalController: require('./modalController').default,
  // cities: require('./cities').default,
  // profile: require('./profile').default,
  // homeData: require('./homeData').default,
  // makeBowl: require('./makeBowl').default,
  // basket: require('./basket').default,
  // kotokoins: require('./kotokoins').default,
  // notifications: require('./notifications').default,
  // ADD NEW REDUCER
});
