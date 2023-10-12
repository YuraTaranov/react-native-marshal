import {TDiscountResponse, TPurchaseDetailResponse, TPurchasesResponse} from '@types';
import {httpGet} from '../http';

export class DiscountService {
  public getDiscount(type: number): Promise<TDiscountResponse> {
    return httpGet(`/discount/fuel?type=${type}`);
  }
}

export default new DiscountService();