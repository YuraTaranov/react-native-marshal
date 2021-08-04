import {combineReducers} from 'redux';

export default combineReducers({
  appGlobalState: require('./appGlobalState').default,
  modalController: require('./modalController').default,
  login: require('./login').default,
  profile: require('./profile').default,
  // ADD NEW REDUCER
});
