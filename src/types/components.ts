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
