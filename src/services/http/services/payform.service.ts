import {httpPost} from '../http';

export class FondyService {
  public getFondyForm(args: any) {
    return httpPost('/fondy/get-url', {...args});
  }

  public payByBonus(args: any) {
    return httpPost('/pay-bonus', {...args});
  }
}

export default new FondyService();
