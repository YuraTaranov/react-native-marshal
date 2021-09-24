import {takeLatest, put, call} from 'redux-saga/effects';
import {httpPost} from '@services';
import {urls} from '@constants';

const GET_NOTIFICATIONS = '[notifications] GET_NOTIFICATIONS';
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

export const getNotifications = () => ({type: GET_NOTIFICATIONS});
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
  yield takeLatest(GET_NOTIFICATIONS, getNotificationsAsync);
  yield takeLatest(REG_DEVICE_TOKEN, regDeviceTokenAsync);
}

export function* getNotificationsAsync() {
  //   // const { accessToken } = yield select(state => state.profile)
  //   yield put(setLoader(true));
  //   try {
  //     const body = yield call(() => httpGet(urls.getNotifications));
  //     yield put(setLoader(false));
  //     if (body.data) {
  //       yield put(setNotifications(body.data));
  //       // navigate('Route');
  //     }
  //   } catch (e) {
  //     yield put(setLoader(false));
  //     errorHandler(e, 'getNotificationsAsync');
  //   }
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
