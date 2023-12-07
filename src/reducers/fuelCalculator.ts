const SET_DEPARTURE_POINT = '[fuelCalculator] SET_DEPARTURE_POINT';
const SET_ARRIVAL_POINT = '[fuelCalculator] SET_ARRIVAL_POINT';
const SET_FUEL_CONSUMPTION = '[fuelCalculator] SET_FUEL_CONSUMPTION';
const SET_ROUTES = '[fuelCalculator] SET_ROUTES';
const RESET_FUEL_CALCULATOR = '[fuelCalculator] RESET_FUEL_CALCULATOR';

const initialstate = {
  departurePoint: '',
  arrivalPoint: '',
  fuelConsumption: '',
  routes: [],
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_DEPARTURE_POINT:
      return Object.assign({}, {...state, departurePoint: action.data});
    case SET_ARRIVAL_POINT:
      return Object.assign({}, {...state, arrivalPoint: action.data});
    case SET_FUEL_CONSUMPTION:
      return Object.assign({}, {...state, fuelConsumption: action.data});
    case SET_ROUTES:
      return Object.assign({}, {...state, routes: action.data});
    case RESET_FUEL_CALCULATOR:
      return initialstate;
    default:
      return state;
  }
};

export const setDeparturePoint = (data: any) => ({
  data,
  type: SET_DEPARTURE_POINT,
});
export const setArrivalPoint = (data: any) => ({data, type: SET_ARRIVAL_POINT});
export const setRoutes = (data: any) => ({data, type: SET_ROUTES});
export const setFuelConsumption = (data: any) => ({
  data,
  type: SET_FUEL_CONSUMPTION,
});
export const resetFuelCalculator = () => ({type: RESET_FUEL_CALCULATOR});

export function* watchFuelCalculator() {}

export function* getFuelCalculatorAsync() {}
