import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as localize from 'react-native-localize';
import {languages} from '@constants';

const ru = require('./translations/ru.json');
const uk = require('./translations/uk.json');
const en = require('./translations/en.json');

const languageCodes = localize.getLocales().map(locale => locale.languageCode);

export const deviceLanguageAndRegion =
  localize.getLocales()[0].languageTag || null;
export const {languageTag}: any =
  localize.findBestAvailableLanguage(languageCodes);

const defaultLanguage = languages.UK;

i18n.use(initReactI18next).init({
  resources: {
    [languages.RU]: {translation: ru},
    [languages.UK]: {translation: uk},
    [languages.EN]: {translation: en},
  },
  lng: defaultLanguage,
  fallbackLng: languages.RU,
  react: {
    nsMode: 'default',
    useSuspense: true,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  nsSeparator: false,
  keySeparator: '.',
  debug: true,
});

export default i18n;
