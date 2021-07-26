export type TGlobalState = {
    appGlobalState: {
        onBoarding: boolean,
        lang: TLang
        accessToken: string
    },
    modalController: {
        support: boolean
    }
}

export type TLang = 'uk' | 'ru' | 'en';
