// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {RouteProp} from '@react-navigation/native';

type TParamOfFuelPurchase = {
  openModal?: boolean;
};
type TParamOfAddCard = {
  openModal?: boolean;
};

export type HomeStackParamList = {
  // SCREEN PARAMS
  FuelPurchase: TParamOfFuelPurchase;
  AddCard: TParamOfAddCard;
};

export type FuelPurchaseRouteProp = RouteProp<
  HomeStackParamList,
  'FuelPurchase'
>;
export type AddCardRouteProp = RouteProp<HomeStackParamList, 'AddCard'>;
