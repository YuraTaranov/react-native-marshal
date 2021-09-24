export type TCar = {
  car_brand: {id: number; name: string};
  car_model: {id: number; name: string; year_start: number; year_end: number};
  car_tank: {id: number; tank: number};
  id: number;
  user_id: number;
  year: number;
};

export type TCarProp = {
  id: number | string;
  name: string;
};

export type TCarModel = {
  id: number;
  name: string;
  year_start: number;
  year_end: number;
};

export type TCarTank = {
  id: number;
  tank: string;
};

export type TAddCar = {
  brand: TCarProp;
  model: TCarProp;
  year: TCarProp;
  tank: TCarProp;
};

export type TProfile = {
  id: number;
  name: string;
  surname: string;
  birthday: string;
  gender: string;
  card: string | null;
  phone: string;
  bearer_token?: string;
  count_bonus?: number;
  count_spent_bonus?: number;
  count_referral?: number;
  fuels: TFuelProfile[];
  setting_affiliate_program: '0' | '1';
  setting_bio_auth: '0' | '1';
  setting_message_dev: '0' | '1';
  setting_action: '0' | '1';
};

export type TPromotion = {
  id: number;
  type: 'new' | 'discount' | 'action';
  image: string;
  discount_percentage?: number;
  start?: string;
  end?: string;
  title: string;
  description?: string;
  text?: string;
  new_price?: string;
  old_price?: string;
};

export type TReferrals = {
  activeReferrals: number;
  bonuses: number;
  bonusesUsed: number;
  referralLink: string;
};

export type TFuel = {
  id: 1 | 2 | 3 | 4;
  name: 'ДТ' | '95' | '98' | '98+';
  price: string;
};

export type TFuelProfile = {
  id: 1 | 2 | 3 | 4;
  name: 'ДТ' | '95' | '98' | '98+';
  liters: number;
};

export type TFullMarker = {
  id: number;
  long: string;
  lat: string;
  citi: string;
  name: string;
  region: string;
  address: string;
};

export type TPetrolStation = TFullMarker & {
  image: string;
  fuels: Array<TFuel>;
};

export type TGetPetrolStationResponseGenerator = {
  data: {
    data: Array<TPetrolStation>;
  };
  statusText: string;
  status: number;
};

export type TStatus = 'none' | 'potential' | 'selected';
export type TListItem = {
  title: string;
  status: TStatus;
};

export type TRegions = string[];
export type TFuelTypes = string[];
export type TFilters = {
  regions: TRegions;
  fuelTypes: TFuelTypes;
};

export type TCreditCard = {
  number: string;
  expiry: string;
  cvc: string;
  type: string;
  selected?: boolean;
};

export type TBiometricsType = 'touchId' | 'faceId' | 'fingerprint' | 'none';

export type TNotification = {
  id: number;
  isRead: boolean;
  title: string;
  message: string;
  body: string;
  data_id: string;
  type: 'action' | 'text';
  date: Date;
};

export type TSettingsText = {
  text: string;
  title: string;
  type: 'about_the_application' | 'loyalty_conditions' | 'terms_of_use';
  updated_at: Date;
};

export type TPaySystemContent = {
  id: number;
  action: () => void;
  title: string;
  icon: string;
  selected?: boolean;
};

export type TLang = 'uk' | 'ru' | 'en';

export type TPrice = {
  title: string;
  cost: number;
  id: number;
};

export type TPurchase = {
  bonuses: number;
  created_at: Date;
  credit_card: number;
  fuel_id: 1 | 2 | 3 | 4;
  id: number;
  liters: number;
  money: string; // money
  type: 'gift' | 'bonuses' | 'many';
  user_id: number;
};
