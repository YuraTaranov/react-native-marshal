export {default as i18n} from './localization/i18n';
export {
  navigationRef,
  onStateChange,
  currentRouteName,
  navigate,
  push,
  pop,
  popToTop,
  goBack,
  reset,
  resetSeveral,
  replace,
} from './route';
export {httpGet, httpPost, httpDel, httpPut} from './http/http';
export {errorHandler} from './errorHandlers/httpErrorHandler';
export {deviceLanguageAndRegion} from './localization/i18n';
export {initGeolocationPermissions} from './location';
