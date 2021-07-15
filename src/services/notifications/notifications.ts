import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { notificationsHandler } from './notificationsHandler';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const notificationService = {
  init: async () => {
    console.log('INIT COMPLETE');

    const checkResult = await notificationService.checkPermission();
    if (checkResult) {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken, 'FCM TOKEN');
      try {
        const body = { device_token: fcmToken };
        // const res = await httpPut('' + '/set-token', body);
      } catch (error) {
        console.log(error, 'ERROR RES NOTIF');
      }
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
      messaging().setAutoInitEnabled(true);
      messaging().onMessage(async (remoteMessage) => {
        // OPENED IN FOREGROUND
        console.log(remoteMessage, 'FOREGROUND');
        notificationsHandler(remoteMessage);
      });
      messaging().onNotificationOpenedApp((remoteMessage) => {
        // OPEN NOTIFICATION FROM BACKGROUND
        console.log(remoteMessage, 'BACKGROUND');
        notificationsHandler(remoteMessage);
      });
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          // OPEN NOTIFICATION FROM QUIT
          console.log(remoteMessage, 'QUIT');
          notificationsHandler(remoteMessage);
        });
    } else {
      notificationService.requestPermission();
    }
  },
  checkPermission: async () => {
    // PushNotification.removeAllDeliveredNotifications();
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
      // PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }
    // try {
    //   const res = await httpPut('/api/v1/user/badge/reset');
    //   console.log(res, 'RESSS');
    // } catch (error) {
    //   console.log(error, 'CATCH');
    // }
    const permissionValue = await messaging().hasPermission();
    // -1 no permission, 0 - disabled in settings, 1 - granted
    return permissionValue > 0;
  },
  requestPermission: async () => {
    const requestResult = await messaging().requestPermission();
    if (requestResult > 0) {
      notificationService.init();
    }
  },
};
