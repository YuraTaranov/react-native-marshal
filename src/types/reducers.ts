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
  TFuel,
  TPurchaseDetail,
} from './components';
import {TRoute} from './geocode';

export type TGlobalState = {
  appGlobalState: {
    onBoarding: boolean;
    lang: TLang;
    accessToken: string;
    loader: boolean;
    isUserAuthorized: boolean;
    bonusesOnBoarding: boolean;
    gps: boolean;
  };
  modalController: {
    support: boolean;
  };
  login: {
    phone: string;
    code: string;
    loading: boolean;
  };
  logout: {
    bioTurnOffAfterLogout: boolean;
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
    endLoading: boolean;
    refreshing: boolean;
  };
  promotionsMain: {
    data: TPromotion[];
    refreshing: boolean;
  };
  promotion: {
    data: TPromotion;
  };
  petrolStations: {
    data: TPetrolStation[];
    loading: boolean;
  };
  filters: TFilters;
  creditCards: TCreditCard[];
  biometrics: {
    biometricsType: TBiometricsType;
    faceIdActiveLocal: boolean;
    needDisableBio: boolean;
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
  fuelCalculator: {
    arrivalPoint: string;
    departurePoint: string;
    fuelConsumption: string;
    routes: TRoute[];
  };
  fuel: {data: TFuel[]};
  network: {
    isConnected: boolean;
  };
  purchaseDetail: {
    data: TPurchaseDetail[];
    loading: boolean;
  };
};
