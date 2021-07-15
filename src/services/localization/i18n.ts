import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as localize from 'react-native-localize';
import {languages} from '@constants';

const ru = require('./translations/ru.json');
const ua = require('./translations/ua.json');
const en = require('./translations/en.json');

const languageCodes = localize.getLocales().map((locale) => locale.languageCode);
const {languageTag}: any = localize.findBestAvailableLanguage(languageCodes);

const defaultLanguage = languages.UA;

i18n.use(initReactI18next).init({
  resources: {
    [languages.RU]: {translation: ru},
    [languages.UA]: {translation: ua},
    [languages.EN]: {translation: en},
  },
  lng: defaultLanguage,
  fallbackLng: languages.RU,
  react: {
    wait: true,
    nsMode: 'default',
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  nsSeparator: false,
  keySeparator: '.',
  debug: true,
});

export default i18n;
