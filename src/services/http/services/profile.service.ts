import { httpGet, httpPost, httpDel, httpPatch, httpPut } from '../http';

export class ProfileService {
    public checkPhone(phone: string) {
        return httpPost('/check-phone', { phone })
    }

    public login(authSms: string) {
        return httpPost('/login', {
            auth_sms: authSms
        })
    }
}

export default new ProfileService();