import {takeLatest, put, call} from 'redux-saga/effects';
import {httpPost} from '@services';
import {urls} from '@constants';

const SET_NOTIFICATIONS = '[notifications] SET_NOTIFICATIONS';
const REG_DEVICE_TOKEN = '[notifications] REG_DEVICE_TOKEN';
const RESET_NOTIFICATIONS = '[notifications] RESET_NOTIFICATIONS';

const initialstate = {
  data: [],
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return Object.assign({}, {...state, data: action.data});
    case RESET_NOTIFICATIONS:
      return initialstate;
    default:
      return state;
  }
};

export const setNotifications = (data: any) => ({
  data,
  type: SET_NOTIFICATIONS,
});
export const regDeviceToken = (data: string) => ({
  data,
  type: REG_DEVICE_TOKEN,
});
export const resetNotifications = () => ({type: RESET_NOTIFICATIONS});

export function* watchNotifications() {
  yield takeLatest(REG_DEVICE_TOKEN, regDeviceTokenAsync);
}

export function* regDeviceTokenAsync(action: any) {
  try {
    const body = yield call(() =>
      httpPost(urls.sendFcmToken, {notification_id: action.data}),
    );
  } catch (e) {
    console.log('regDeviceTokenAsync', e);
  }
}
