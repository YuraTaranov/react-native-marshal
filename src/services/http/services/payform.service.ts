import {httpPost, httpGet, httpDel} from '../http';

export class FondyService {
  public getFondyForm(args: any) {
    return httpPost('/fondy/get-url', {...args});
  }

  public payByBonus(args: any) {
    return httpPost('/pay-bonus', {...args});
  }

  public getPaymentСards() {
    return httpGet('/fondy/credit-card');
  }

  public deletePaymentСardById(id: string | number) {
    return httpDel(`/fondy/credit-card/${id}`);
  }

  public verificationCard() {
    return httpPost('/fondy/verification-card');
  }
}

export default new FondyService();
