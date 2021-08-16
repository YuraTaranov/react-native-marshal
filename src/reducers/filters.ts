// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TFilters, TRegions, TFuelTypes} from '@types';

const GET_FILTERS = '[filters] GET_FILTERS';
const SET_FILTERS = '[filters] SET_FILTERS';
const RESET_FILTERS = '[filters] RESET_FILTERS';

const regions: TRegions = [];
const fuelTypes: TFuelTypes = [];
const initialstate: TFilters = {regions, fuelTypes};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_FILTERS:
      return Object.assign({}, {...action.data});
    case RESET_FILTERS:
      return initialstate;
    default:
      return state;
  }
};

export const getFilters = () => ({type: GET_FILTERS});
export const setFilters = (data: TFilters) => ({data, type: SET_FILTERS});
export const resetFilters = () => ({type: RESET_FILTERS});
