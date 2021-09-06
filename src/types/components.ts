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
};

export type TPromotion = {
  id: number;
  type: number;
  angle?: number;
  start?: string;
  end?: string;
  title: string;
  text?: string;
  price_new?: string;
  price_old?: string;
};

export type TReferrals = {
  activeReferrals: number;
  bonuses: number;
  bonusesUsed: number;
  referralLink: string;
};

export type TFuel = {
  id: number;
  name: string;
  price: string;
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

export type TPaySystemContent = {
  id: number;
  action: () => void;
  title: string;
  icon: string;
  selected?: boolean;
};
