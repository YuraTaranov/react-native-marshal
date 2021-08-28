import {Platform, Geolocation, PermissionsAndroid} from '../components';

export const initGeolocationPermissions = () => {
  if (Platform.OS === 'android') {
    try {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]).then(result => {
        console.log(result);
      });
    } catch (err) {
      console.warn(err);
    }
  } else {
    Geolocation.requestAuthorization('always').then(res => {
      console.log(res);
    });
  }
};
