const SET_NETWORK = '[network] SET_NETWORK';
const RESET_NETWORK = '[network] RESET_NETWORK';

const initialstate = {
  isConnected: true,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_NETWORK:
      return Object.assign({}, {...state, isConnected: action.data});
    case RESET_NETWORK:
      return initialstate;
    default:
      return state;
  }
};

export const setIsConnected = (data: any) => ({data, type: SET_NETWORK});
export const resetNetwork = () => ({type: RESET_NETWORK});
