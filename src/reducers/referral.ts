import {takeLatest, put, call} from 'redux-saga/effects';
import {httpGet, errorHandler} from '@services';
import {urls} from '@constants';

const GET_REFERRAL_LINK = '[referral] GET_REFERRAL_LINK';
const SET_REFERRAL_LINK = '[referral] SET_REFERRAL_LINK';
const SET_REFERRAL_USER_ID = '[referral] SET_REFERRAL_USER_ID';
const RESET_REFERRAL = '[referral] RESET_REFERRAL';

const initialstate = {
  link: '',
  userId: '',
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_REFERRAL_LINK:
      return Object.assign({}, {...state, link: action.data});
    case SET_REFERRAL_USER_ID:
      return Object.assign({}, {...state, userId: action.data});
    case RESET_REFERRAL:
      return initialstate;
    default:
      return state;
  }
};

export const getReferralLink = () => ({type: GET_REFERRAL_LINK});
export const setReferral = (data: any) => ({data, type: SET_REFERRAL_LINK});
export const setReferralUserId = (data: any) => ({
  data,
  type: SET_REFERRAL_USER_ID,
});
export const resetReferral = () => ({type: RESET_REFERRAL});

export function* watchReferral() {
  yield takeLatest(GET_REFERRAL_LINK, getReferralLinkAsync);
}

export function* getReferralLinkAsync() {
  try {
    const body = yield call(() => httpGet(urls.getReferralLink));
    if (body.data.data.shortLink) {
      yield put(setReferral(body.data.data.shortLink));
    }
  } catch (e) {
    errorHandler(e, 'getReferralAsync');
  }
}
