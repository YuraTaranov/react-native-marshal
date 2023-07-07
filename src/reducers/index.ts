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
  creditCards: require('./creditCards').default,
  biometrics: require('./biometrics').default,
  searchStations: require('./searchStations').default,
  notifications: require('./notifications').default,
  settings: require('./settings').default,
  referral: require('./referral').default,
  promotionsMain: require('./promotionsMain').default,
  fuelCalculator: require('./fuelCalculator').default,
  fuel: require('./fuel').default,
  network: require('./network').default,
  purchaseDetail: require('./purchaseDetail').default,
  // ADD NEW REDUCER
});
