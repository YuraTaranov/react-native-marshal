import {combineReducers} from 'redux';

export default combineReducers({
  appGlobalState: require('./appGlobalState').default,
  modalController: require('./modalController').default,
  login: require('./login').default,
  profile: require('./profile').default,
  logout: require('./logout').default,
  purchases: require('./purchases').default,
  cars: require('./cars').default,
  addCar: require('./addCar').default,
  promotions: require('./promotions').default,
  promotion: require('./promotion').default,
  petrolStations: require('./petrolStations').default,
  filters: require('./filters').default,
  // ADD NEW REDUCER
});
