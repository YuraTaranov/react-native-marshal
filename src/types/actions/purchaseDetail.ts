import {TPurchaseDetail} from '@types';

interface IPurchaseDetailActions {
  GET_PURCHASE_DETAIL: string;
  SET_PURCHASE_DETAIL: string;
  RESET_PURCHASE_DETAIL: string;
}

export interface IGetPurchaseDetail {
  type: IPurchaseDetailActions['GET_PURCHASE_DETAIL'];
  data: number;
}

export interface ISetPurchaseDetail {
  type: IPurchaseDetailActions['SET_PURCHASE_DETAIL'];
  data: TPurchaseDetail[];
}
