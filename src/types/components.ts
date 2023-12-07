export type {StyleProp, ViewStyle} from 'react-native';

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
  setting_affiliate_program: boolean;
  setting_bio_auth: boolean;
  setting_message_dev: boolean;
  setting_action: boolean;
  setting_notification: boolean;
};

export type TPromotion = {
  id: number;
  type: 'new' | 'discount' | 'action';
  image: string;
  image_background: string;
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
  price?: string;
};

export type TFullMarker = {
  id: number;
  long: string;
  lat: string;
  citi: string;
  name: string;
  region: string;
  address: string;
  image: string;
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
  data_id: number;
  type: 'action' | 'new' | 'discount' | 'text';
  date: Date;
};

export type TSettingsText = {
  text: string;
  text_html: string;
  title: string;
  type:
    | 'about_the_application'
    | 'loyalty_conditions'
    | 'terms_of_use'
    | 'privacy_policies';
  updated_at: Date;
};

export type TPaySystemContent = {
  id: number;
  action: () => void;
  title: string;
  icon: string;
  selected?: boolean;
};

export type TLang = 'uk' | 'ru' | 'en' | null;
export type Tgps = boolean;
export type TPrice = {
  title: string;
  cost: number;
  id: number;
};

export type TPurchase = {
  transaction_id: number;
  date: Date;
  total_amount: number;
  total_issuance: number;
  total_redeem: number;
  total_discount: number;
};

export type TPurchaseDetail = {
  name: string;
  quantity: number;
  price: number;
  amount: number;
  discount_amount: number;
  bonus_issuance: number;
  bonus_redeem: number;
  product_code: string;
};

export type TDiscount = {
  quantity: number;
  type: number;
  date: string;
  discount: number;
  next_discount: number;
};

export type TPaymentСard = {
  id: number;
  card: string;
  selected?: boolean;
  rectoken?: string;
};

export type TPaymentСards = TPaymentСard[];
export type TGetPaymentСardsResponseGenerator = {
  data: {
    data: TPaymentСards;
  };
  statusText: string;
  status: number;
};

export type TSectionListItem = {
  title: string;
  data: TPurchase[];
};

export enum EFuel {
  PETROL = 1,
  DIESEL = 2,
  GAS = 3,
}

export type TCard = {
  card_number: string;
  qr: string;
};

export type TFuelData = {
  quantity: number;
  type: number;
  discount: number;
  next_discount: number;
  date: string;
  title: string;
  card: TCard;
};

export enum EFuelTitle {
  PETROL = 'petrol',
  GAS = 'gas',
  DIESEL = 'diesel',
}
