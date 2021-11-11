// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {RouteProp} from '@react-navigation/native';

type TParamOfFuelPurchase = {
  openModal?: boolean;
};
type TParamOfAddCard = {
  openModal?: boolean;
};

export type TParamOfPayForm = {
  liters: string;
  fuel_id: string;
  phone?: string;
};

export type HomeStackParamList = {
  // SCREEN PARAMS
  FuelPurchase: TParamOfFuelPurchase;
  AddCard: TParamOfAddCard;
  PayForm: TParamOfPayForm;
};

export type FuelPurchaseRouteProp = RouteProp<
  HomeStackParamList,
  'FuelPurchase'
>;
export type AddCardRouteProp = RouteProp<HomeStackParamList, 'AddCard'>;
export type PayFormRouteProp = RouteProp<HomeStackParamList, 'PayForm'>;
