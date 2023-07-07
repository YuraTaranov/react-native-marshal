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
  verificationCard?: boolean;
  rectoken?: string;
};

export type TParaOfPurchaseDetail = {
  transactionId: number;
  transactionDate: Date;
};

export type HomeStackParamList = {
  // SCREEN PARAMS
  FuelPurchase: TParamOfFuelPurchase;
  PayForm: TParamOfPayForm;
  PurchaseDetail: TParaOfPurchaseDetail;
};

export type FuelPurchaseRouteProp = RouteProp<
  HomeStackParamList,
  'FuelPurchase'
>;
export type PayFormRouteProp = RouteProp<HomeStackParamList, 'PayForm'>;
export type PurchaseDetailRouteProp = RouteProp<
  HomeStackParamList,
  'PurchaseDetail'
>;
