const SET_TEXT_OF_SEARCH = '[searchStations] SET_TEXT_OF_SEARCH';
const RESET_SEARCH_STATIONS = '[searchStations] RESET_SEARCH_STATIONS';

const initialstate = {
  textOfSearch: '',
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_TEXT_OF_SEARCH:
      return Object.assign({}, {...state, textOfSearch: action.data});
    case RESET_SEARCH_STATIONS:
      return initialstate;
    default:
      return state;
  }
};

export const setTextOfSearch = (data: string) => ({
  data,
  type: SET_TEXT_OF_SEARCH,
});
export const resetSearchStations = () => ({type: RESET_SEARCH_STATIONS});
