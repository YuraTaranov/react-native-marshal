import React from 'react';
import {useCallback, useEffect, useNavigation} from '@hooks';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {TNotification} from '@types';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
// import {ios} from '@constants';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {setNotifications, regDeviceToken} from '@reducers/notifications';
import {Dispatch} from 'redux';

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
  const {navigate} = useNavigation();

  useEffect(() => {
    isUserAuthorized && checkPermission();
  }, [isUserAuthorized]);

  const handleNotification: (item: TNotification, badge: number) => null =
    useCallback(
      (item, badge) => {
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
                [...modifiedNotifications, ...notifications].slice(0, 40),
              ),
            );
            PushNotification.removeAllDeliveredNotifications();
          }
          console.log('111', data);
        });
        // проверить
        // if (ios && badge) {
        //   PushNotificationIOS.setApplicationIconBadgeNumber(Number(badge));
        // }
        return null;
      },
      [notifications],
    );

  useEffect(() => {
    const unsubscribe = firebase
      .messaging()
      .onMessage(async (remoteMessage: any) => {
        console.log('Foreground push data', remoteMessage.data);
        const modifiedNotification: TNotification = {
          ...remoteMessage.data,
          isRead: false,
        };
        dispatch(
          setNotifications(
            [modifiedNotification, ...notifications].slice(0, 40),
          ),
        );
      });

    return unsubscribe;
  }, [notifications]);

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async (remoteMessage: any) => {
        console.log('Trey push data', remoteMessage.data);
        const modifiedNotification: TNotification = {
          ...remoteMessage.data,
          isRead: true,
        };
        setTimeout(() => {
          dispatch(
            setNotifications(
              [modifiedNotification, ...notifications].slice(0, 40),
            ),
          );
          handleNotification(modifiedNotification, remoteMessage.badge);
        }, 1000);
      },
    );

    return unsubscribe;
  }, [notifications]);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          console.log('Quit push data', remoteMessage.data);
          const modifiedNotification: TNotification = {
            ...remoteMessage.data,
            isRead: true,
          };
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
        }
      })
      .catch((e: any) => console.log('getInitialNotification error', e));
  }, [notifications]);

  //   useEffect(() => {
  //     // to ignore warning
  //     const test = firebase
  //       .messaging()
  //       .setBackgroundMessageHandler(async () => {});

  //     return test;
  //   }, []);

  const getToken = useCallback(async () => {
    const fcmToken = await messaging().getToken();
    console.log('fcmToken', fcmToken);
    fcmToken && dispatch(regDeviceToken(fcmToken));
  }, []);

  const checkPermission = useCallback(async () => {
    const enabled = await messaging().hasPermission();
    if (enabled === 1) {
      console.log('NOTIFICATIONS PERMISSIONS ENABLED');
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
      messaging().setAutoInitEnabled(true);
      //   if (ios) {
      //     PushNotificationIOS.removeAllDeliveredNotifications();
      //     // PushNotificationIOS.setApplicationIconBadgeNumber(0);
      //   }
      getToken();
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
