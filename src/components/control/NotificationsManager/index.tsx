import React from 'react';
import {useCallback, useEffect, useNavigation} from '@hooks';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {TNotification} from '@types';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
// import {ios} from '@constants';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {Importance} from 'react-native-push-notification';
import {
  setNotifications,
  regDeviceToken,
  getNotificationsCount,
  readNotifications,
} from '@reducers/notifications';
import {Dispatch} from 'redux';
import {getPromotion} from '@reducers/promotion';
import {getPromotionsMain} from '@reducers/promotionsMain';
import {getPromotions} from '@reducers/promotions';
import {ios} from '@constants';

type TProps = {
  dispatch: Dispatch;
  isUserAuthorized: boolean;
  notifications: TNotification[];
};

const NotificationsManager: React.FC<TProps> = ({
  dispatch,
  notifications,
  isUserAuthorized,
}) => {
  const {navigate, reset} = useNavigation();

  useEffect(() => {
    isUserAuthorized && checkPermission();
  }, [isUserAuthorized]);

  const handleNotification: (item: TNotification, badge?: number) => null =
    useCallback(
      (item, badge) => {
        ios &&
          PushNotification.getDeliveredNotifications(data => {
            if (data.length) {
              const modifiedNotifications = data.map(item => {
                return {
                  id: item.userInfo.id,
                  title: item.userInfo.title,
                  message: item.userInfo.message,
                  body: item.userInfo.body,
                  type: item.userInfo.type,
                  date: item.userInfo.date,
                  data_id: item.userInfo.data_id,
                  isRead: false,
                };
              });
              dispatch(
                setNotifications(
                  [item, ...modifiedNotifications, ...notifications].slice(
                    0,
                    40,
                  ),
                ),
              );
            }
          });
        if (item) {
          if (
            item.type === 'action' ||
            item.type === 'discount' ||
            item.type === 'new'
          ) {
            dispatch(getPromotion({id: item.data_id, item}));
          } else {
            navigate('ProfileStack', {
              screen: 'NotificationsDetail',
              params: {...item},
            });
          }
        }

        return null;
      },
      [notifications, navigate],
    );

  useEffect(() => {
    const unsubscribe = firebase
      .messaging()
      .onMessage(async (remoteMessage: any) => {
        dispatch(getNotificationsCount());
        __DEV__ && console.log('Foreground push data', remoteMessage.data);
        const modifiedNotification: TNotification = {
          ...remoteMessage.data,
          isRead: false,
        };
        dispatch(
          setNotifications(
            [modifiedNotification, ...notifications].slice(0, 40),
          ),
        );

        PushNotification.localNotification({
          autoCancel: true,
          largeIcon: 'ic_stat_name',
          smallIcon: 'ic_stat_name',
          priority: 'max',
          visibility: 'public',
          importance: 'max',
          channelId: 'channel-id',
          vibrate: true,
          vibration: 300,
          playSound: false,
          soundName: 'default',
          userInfo: {data: remoteMessage.data},
          title: remoteMessage.data.title || '',
          message: remoteMessage.data.message || '',
        });
      });
    return unsubscribe;
  }, [notifications]);

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async (remoteMessage: any) => {
        __DEV__ && console.log('onNotificationOpenedApp', remoteMessage.data);
        if (remoteMessage.data && remoteMessage.data.id) {
          dispatch(readNotifications(remoteMessage.data.id));
        }
        const modifiedNotification: TNotification = {
          ...remoteMessage.data,
          isRead: true,
        };
        dispatch(getNotificationsCount());
        dispatch(
          setNotifications(
            [modifiedNotification, ...notifications].slice(0, 40),
          ),
        );
        __DEV__ && console.log('modifiedNotification', modifiedNotification);

        handleNotification(modifiedNotification, remoteMessage.badge);
      },
    );

    return unsubscribe;
  }, [notifications]);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        dispatch(getNotificationsCount());
        if (remoteMessage) {
          __DEV__ && console.log('Quit push data', remoteMessage.data);
          const modifiedNotification: TNotification = {
            ...remoteMessage.data,
            isRead: true,
          };
          if (notifications.length) {
            if (notifications[0].id !== modifiedNotification.id) {
              setTimeout(() => {
                dispatch(
                  setNotifications(
                    [modifiedNotification, ...notifications].slice(0, 40),
                  ),
                );
                handleNotification(modifiedNotification, remoteMessage.badge);
              }, 1000);
            }
          } else {
            setTimeout(() => {
              dispatch(setNotifications([modifiedNotification]));
              handleNotification(modifiedNotification, remoteMessage.badge);
            }, 1000);
          }
        }
      })
      .catch((e: any) => console.log('getInitialNotification error', e));
  }, [notifications]);

  const getToken = useCallback(async () => {
    await messaging().deleteToken();
    const fcmToken = await messaging().getToken();
    fcmToken && dispatch(regDeviceToken(fcmToken));
  }, []);

  const checkPermission = useCallback(async () => {
    const enabled = await messaging().hasPermission();
    if (enabled === 1) {
      __DEV__ && console.log('NOTIFICATIONS PERMISSIONS ENABLED');
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
      messaging().setAutoInitEnabled(true);
      getToken();

      PushNotification.createChannel(
        {
          channelId: 'channel-id',
          channelName: 'My channel',
        },
        callback => {},
      );

      PushNotification.configure({
        onNotification: e => {
          const clicked = e.userInteraction;
          if (clicked) {
            handleNotification(e.data.data);
          }
        },
      });
    } else {
      requestPermission();
    }
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      const request = await messaging().requestPermission();
      request === 1 && getToken();
    } catch (error) {
      console.log('permission rejected', error);
    }
  }, []);

  return null;
};

const mapStateToProps = (state: TGlobalState) => ({
  isUserAuthorized: state.appGlobalState.isUserAuthorized,
  notifications: state.notifications.data,
});
export default connect(mapStateToProps)(NotificationsManager);
