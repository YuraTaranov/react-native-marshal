import {TPurchaseDetailResponse, TPurchasesResponse} from '@types';
import {httpGet} from '../http';

export class PurchaseService {
  public getPurchases(page: number): Promise<TPurchasesResponse> {
    return httpGet('/profile/purchases', {page, limit: 15});
  }

  public getPurchaseDetail(
    transaction_id: number,
  ): Promise<TPurchaseDetailResponse> {
    return httpGet(`/profile/purchases/${transaction_id}`);
  }
}

export default new PurchaseService();
