import { httpGet, httpPost, httpDel, httpPatch, httpPut } from '../http';

export class AuthService {
    public checkPhone(phone: string) {
        return httpPost('/check-phone', { phone })
    }

    public login(authSms: string) {
        return httpPost('/login', {
            auth_sms: authSms
        })
    }
}

export default new AuthService();