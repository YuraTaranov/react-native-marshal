import {TCar, TCarModel, TCarProp, TProfile} from './components';

export type TGlobalState = {
  appGlobalState: {
    onBoarding: boolean;
    lang: TLang;
    accessToken: string;
    loader: boolean;
    isUserAuthorized: boolean;
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
};

export type TLang = 'uk' | 'ru' | 'en';
