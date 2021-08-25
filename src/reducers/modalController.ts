const SET_SUPPORT = '[modalController] SET_SUPPORT';
const RESET_MODAL_CONTROLLER = '[modalController] RESET_MODAL_CONTROLLER';

const initialstate = {
  support: false,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_SUPPORT:
      return Object.assign({}, {...state, support: action.data});
    case RESET_MODAL_CONTROLLER:
      return initialstate;
    default:
      return state;
  }
};

export const setSupport = (data: boolean | any) => ({data, type: SET_SUPPORT});
export const resetModalController = () => ({type: RESET_MODAL_CONTROLLER});
