import {takeLatest, put, call} from 'redux-saga/effects';
import {httpGet, httpPost} from '@services';
import {urls} from '@constants';
import store from '../store';
import {TGlobalState} from '@types';

const SET_NOTIFICATIONS = '[notifications] SET_NOTIFICATIONS';
const SET_NOTIFICATIONS_COUNT = '[notifications] SET_NOTIFICATIONS_COUNT';
const SET_NOTIFICATIONS_REFRESH = '[notifications] SET_NOTIFICATIONS_REFRESH';
const SET_LOADING_NOTIFICATIONS = '[notifications] SET_LOADING_NOTIFICATIONS';
const SET_FINISHED_GET_NOTIFICATIONS =
  '[notifications] SET_FINISHED_GET_NOTIFICATIONS';
const SET_LAZY_LOADING_NOTIFICATIONS =
  '[notifications] SET_LAZY_LOADING_NOTIFICATIONS';
const GET_NOTIFICATIONS = '[notifications] GET_NOTIFICATIONS';
const GET_NOTIFICATIONS_COUNT = '[notifications] GET_NOTIFICATIONS_COUNT';
const READ_NOTIFICATIONS = '[notifications] READ_NOTIFICATIONS';
const REG_DEVICE_TOKEN = '[notifications] REG_DEVICE_TOKEN';
const RESET_NOTIFICATIONS = '[notifications] RESET_NOTIFICATIONS';

const initialstate = {
  loading: true,
  finishedGetNotifications: false,
  lazyLoading: false,
  isRefresh: false,
  data: [],
  count: 0,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return Object.assign({}, {...state, data: action.data});
    case SET_LOADING_NOTIFICATIONS:
      return Object.assign({}, {...state, loading: action.data});
    case SET_NOTIFICATIONS_REFRESH:
      return Object.assign({}, {...state, isRefresh: action.data});
    case SET_NOTIFICATIONS_COUNT:
      return Object.assign({}, {...state, count: action.data});
    case SET_FINISHED_GET_NOTIFICATIONS:
      return Object.assign(
        {},
        {...state, finishedGetNotifications: action.data},
      );
    case SET_LAZY_LOADING_NOTIFICATIONS:
      return Object.assign({}, {...state, lazyLoading: action.data});
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
export const setLoadingNotifications = (data: any) => ({
  data,
  type: SET_LOADING_NOTIFICATIONS,
});
export const setNotificationsRefresh = (data: any) => ({
  data,
  type: SET_NOTIFICATIONS_REFRESH,
});
export const setNotificationsCount = (data: any) => ({
  data,
  type: SET_NOTIFICATIONS_COUNT,
});
export const setFinishedGetNotifications = (data: any) => ({
  data,
  type: SET_FINISHED_GET_NOTIFICATIONS,
});
export const setLazyLoadingNotifications = (data: any) => ({
  data,
  type: SET_LAZY_LOADING_NOTIFICATIONS,
});
export const regDeviceToken = (data: string) => ({
  data,
  type: REG_DEVICE_TOKEN,
});
export const getNotifications = (data: number) => ({
  data,
  type: GET_NOTIFICATIONS,
});
export const getNotificationsCount = () => ({
  type: GET_NOTIFICATIONS_COUNT,
});
export const readNotifications = (data: number) => ({
  data,
  type: READ_NOTIFICATIONS,
});
export const resetNotifications = () => ({type: RESET_NOTIFICATIONS});

export function* watchNotifications() {
  yield takeLatest(REG_DEVICE_TOKEN, regDeviceTokenAsync);
  yield takeLatest(GET_NOTIFICATIONS, getNotificationsAsync);
  yield takeLatest(READ_NOTIFICATIONS, readNotificationsAsync);
  yield takeLatest(GET_NOTIFICATIONS_COUNT, getNotificationsCountAsync);
}

export function* getNotificationsAsync(action: any) {
  try {
    const body = yield call(() =>
      httpGet(urls.getNotifications, {page: action.data}),
    );
    const notifications = body.data.data;
    if (notifications.length < 10) {
      yield put(setFinishedGetNotifications(true));
    } else {
      yield put(setFinishedGetNotifications(false));
    }
    const state: any = store.store.getState();
    action.data === 1
      ? yield put(setNotifications(notifications))
      : yield put(
          setNotifications([...state.notifications.data, ...notifications]),
        );
  } catch (e) {
    console.log('getNotificationsAsync', e);
  } finally {
    yield put(setLazyLoadingNotifications(false));
    yield put(setNotificationsRefresh(false));
    yield put(setLoadingNotifications(false));
  }
}
export function* readNotificationsAsync(action: any) {
  const state: any = store.store.getState();
  try {
    const body = yield call(() =>
      httpPost(`${urls.readNotification}/${action.data}`),
    );
    const notificationsActuality = state.notifications.data.map((item: any) => {
      return {...item, isRead: item.id === action.data ? true : item.isRead};
    });
    yield put(setNotifications(notificationsActuality));

    if (state.notifications.count > 0) {
      yield put(setNotificationsCount(state.notifications.count - 1));
    }
  } catch (e) {
    console.log('readNotificationsAsync', e);
  } finally {
  }
}

export function* getNotificationsCountAsync(action: any) {
  try {
    const body = yield call(() => httpGet(urls.notificationsCount));
    yield put(setNotificationsCount(body.data.data.count));
  } catch (e) {
    console.log('regDeviceTokenAsync', e);
  } finally {
  }
}

export function* regDeviceTokenAsync(action: any) {
  try {
    const body = yield call(() =>
      httpPost(urls.sendFcmToken, {notification_id: action.data}),
    );
  } catch (e) {
    console.log('regDeviceTokenAsync', e);
  } finally {
  }
}
