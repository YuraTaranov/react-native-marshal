import React from 'react';
import {
  useCallback,
  useEffect,
  useTranslation,
  useState,
  useRoute,
  useNavigation,
} from '@hooks';
import {FondyService, weblog} from '@httpServices';
import {WebView} from 'react-native-webview';

import styles from './styles';
import {Alert, HeaderButton, KeyboardAvoidingView} from '@components';
import ShowLoading from './components/ShowLoading/ShowLoading';

//Types
type TProps = {};
import {PayFormRouteProp, TParamOfPayForm} from '@types';
import {colors} from '@constants';

let timer: NodeJS.Timeout;

const userAgent =
  'Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19';

const INJECTED_JAVASCRIPT = `(function() {
  window.ReactNativeWebView.postMessage('loaded');
})();`;

const errorHandler = (error: any) => {
  if (error?.data?.errors?.phone) {
    Alert.alert(
      'Телефон не найден',
      `Телефон для подарка
      должен быть
      в базе приложения`,
    );
  } else {
    Alert.alert('Ошибка связи');
  }
};

const getFondyForm = async (
  args: TParamOfPayForm,
  setUriFunc: (uri: string) => void,
  goBackFunc: () => void,
  hiddenLoading: () => void,
) => {
  try {
    // console.log("URI2:", uri);
    const {data} = await FondyService.getFondyForm(args);
    setUriFunc(data);
  } catch (e) {
    hiddenLoading();
    if (typeof goBackFunc === 'function') {
      goBackFunc();
    }
    errorHandler(e);
  }
};

const getVerificationCardFondyForm = async (
  setUriFunc: (uri: string) => void,
  goBackFunc: Function,
  hiddenLoading: () => void,
) => {
  try {
    const {data} = await FondyService.verificationCard();
    setUriFunc(data);
  } catch (e) {
    hiddenLoading();
    if (typeof goBackFunc === 'function') {
      goBackFunc();
    }
    errorHandler(e);
  }
};
const goToMyCardsPage = (nav: (route: string) => void) => () => nav('MyCards');

const PayForm: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();
  const [uri, setUri] = useState('');
  const {params} = useRoute<PayFormRouteProp>();
  const {setOptions, goBack, navigate} = useNavigation();
  const [isShowLoading, setShowLoading] = useState(true);
  const hiddenLoading = useCallback(() => setShowLoading(false), []);

  useEffect(() => {
    if (params) {
      if (params?.verificationCard) {
        setOptions({
          title: `${t('addingNewCreditCard')}`,
          headerLeft: () => (
            <HeaderButton
              name={'left'}
              size={24}
              color={colors.white_FFFFFF}
              onPress={goToMyCardsPage(navigate)}
            />
          ),
        });
        getVerificationCardFondyForm(
          setUri,
          goToMyCardsPage(navigate),
          hiddenLoading,
        );
      } else {
        setOptions({
          headerLeft: () => (
            <HeaderButton
              name={'left'}
              size={24}
              color={colors.white_FFFFFF}
              onPress={goBack}
            />
          ),
        });
        if (params?.phone) {
          setOptions({
            title: `${t('ForPhone')}: ${params.phone}`,
          });
        }
        getFondyForm(params, setUri, goBack, hiddenLoading);
      }
    }
  }, [goBack, params, setOptions, t, navigate, hiddenLoading]);

  const parserOnMessage = (data: any) => {
    if (data?.nativeEvent?.loading) {
      setShowLoading(false);
    }

    if (data?.nativeEvent?.error) {
      setShowLoading(false);
      console.log('\nerror', data?.nativeEvent?.error);
    }
  };

  const onLoadStart = (navState: any) => {
    // console.log('\n>>>>>> onLoadStart', navState?.nativeEvent?.url);
  };

  useEffect(() => {
    timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);
    return timer && clearTimeout(timer);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
      <WebView
        useWebKit
        sharedCookiesEnabled
        injectedJavaScript={INJECTED_JAVASCRIPT}
        source={{uri}}
        javaScriptEnabled
        javaScriptEnabledAndroid
        bounces
        onError={() => setShowLoading(false)}
        userAgent={userAgent}
        domStorageEnabled
        thirdPartyCookiesEnabled
        onMessage={parserOnMessage}
        onLoadStart={onLoadStart}
      />
      <ShowLoading isShowLoading={isShowLoading} />
    </KeyboardAvoidingView>
  );
};

export default PayForm;
