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
  TLang,
  TPurchase,
  TNotification,
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
    data: TPurchase[];
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
  notifications: {
    data: TNotification[];
  };
  settings: {
    data: TSettingsText[];
  };
  referral: {
    link: string;
    userId: string;
  };
};
