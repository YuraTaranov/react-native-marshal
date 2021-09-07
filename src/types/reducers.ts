/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TCar,
  TCarModel,
  TCarProp,
  TCreditCard,
  TFilters,
  TPetrolStation,
  TProfile,
  TPromotion,
  TBiometricsType,
  TSettingsText,
} from './components';

export type TGlobalState = {
  appGlobalState: {
    onBoarding: boolean;
    lang: TLang;
    accessToken: string;
    loader: boolean;
    isUserAuthorized: boolean;
    bonusesOnBoarding: boolean;
  };
  modalController: {
    support: boolean;
  };
  login: {
    phone: string;
    code: string;
    loading: boolean;
  };
  profile: {
    data: TProfile;
  };
  purchases: {
    //   FIXME:
    data: [];
    lazyLoading: boolean;
    finishLoading: boolean;
    refreshing: boolean;
  };
  cars: {
    data: TCar[];
  };
  addCar: {
    brands: TCarProp[];
    models: TCarModel[];
    tank: TCarProp[];
    loading: false;
  };
  promotions: {
    data: TPromotion[];
    lazyLoading: boolean;
    finishLoading: boolean;
    refreshing: boolean;
  };
  promotion: {
    data: TPromotion;
  };
  petrolStations: TPetrolStation[];
  filters: TFilters;
  creditCards: TCreditCard[];
  biometrics: {
    biometricsType: TBiometricsType;
    faceIdActiveLocal: boolean;
    user_key: string;
  };
  searchStations: {
    textOfSearch: string;
  };
  //   FIXME:
  notifications: {
    data: [];
  };
  settings: {
    data: TSettingsText[];
  };
};

export type TLang = 'uk' | 'ru' | 'en';
