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
    id: number;
    name: string;
    surname: string;
    birthday: string;
    gender: string;
    card: string | null;
    phone: string;
    bearer_token?: string;
  };
};

export type TLang = 'uk' | 'ru' | 'en';
