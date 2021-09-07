import {TBiometricsType} from '@types';

const SET_BIOMETRICS_TYPE = '[biometrics] SET_BIOMETRICS_TYPE';
const SET_FACE_ID_ACTIVE_LOCAL = '[biometrics] SET_FACE_ID_ACTIVE_LOCAL';
const SET_USER_KEY = '[biometrics] SET_USER_KEY';
const RESET_BIOMETRICS = '[biometrics] RESET_BIOMETRICS';

const initialstate = {
  biometricsType: '',
  faceIdActiveLocal: false,
  user_key: '',
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_BIOMETRICS_TYPE:
      return Object.assign({}, {...state, biometricsType: action.data});
    case SET_FACE_ID_ACTIVE_LOCAL:
      return Object.assign({}, {...state, faceIdActiveLocal: action.data});
    case SET_USER_KEY:
      return Object.assign({}, {...state, user_key: action.data});
    case RESET_BIOMETRICS:
      return initialstate;
    default:
      return state;
  }
};

export const setBiometricsType = (data: TBiometricsType) => ({
  data,
  type: SET_BIOMETRICS_TYPE,
});
export const setFaceIdActiveLocal = (data: boolean) => ({
  data,
  type: SET_FACE_ID_ACTIVE_LOCAL,
});
export const setUserKey = (data: string) => ({
  data,
  type: SET_USER_KEY,
});
export const resetBiometrics = () => ({type: RESET_BIOMETRICS});
