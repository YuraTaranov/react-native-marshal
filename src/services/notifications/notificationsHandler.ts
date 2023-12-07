import {Platform} from 'react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const notificationsHandler = async (remoteMessage: TRM) => {
  if (!!remoteMessage) {
    if (remoteMessage.data && remoteMessage.data.badge) {
      // ToDo
      if (Platform.OS == 'ios') {
        // PushNotificationIOS.setApplicationIconBadgeNumber(Number(remoteMessage.data.badge));
      }
    }
    if (remoteMessage.data?.type === 'App\\Notifications\\Type') {
      //ToDo
    }
  }
};

type TRM = FirebaseMessagingTypes.RemoteMessage | null;
