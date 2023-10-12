import {TPurchase, TPurchaseDetail} from '@types';

export type TGenerateOptions = {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: any;
  params?: any;
};

export type TFormatResponse = {
  data: any;
  status: number;
  statusText: string;
};

export type TPurchasesResponse = {
  data: {
    data: {
      total_pages: number;
      transactions: TPurchase[];
    };
  };
};

export type TPurchaseDetailResponse = {
  data: {
    data: TPurchaseDetail[];
  };
};

export type TDiscountResponse = {
  data: {
    quantity: number,
    type: number,
    discount: number,
    next_discount: number
  }
}
