import {TPurchase} from '../components';

interface IPurchasesActions {
  GET_PURCHASES: string;
  SET_PURCHASES: string;
  SET_REFRESHING: string;
  SET_LAZY_LOADING: string;
  SET_FINISH_LOADING: string;
}

export interface IGetPurchases {
  type: IPurchasesActions['GET_PURCHASES'];
  data: number;
}

export interface ISetPurchases {
  type: IPurchasesActions['SET_PURCHASES'];
  data: TPurchase[];
}

export interface ISetPurchasesRefreshing {
  type: IPurchasesActions['SET_REFRESHING'];
  data: boolean;
}

export interface ISetPurchasesLazyLoading {
  type: IPurchasesActions['SET_LAZY_LOADING'];
  data: boolean;
}

export interface ISetPurchasesFinishLoading {
  type: IPurchasesActions['SET_FINISH_LOADING'];
  data: boolean;
}
