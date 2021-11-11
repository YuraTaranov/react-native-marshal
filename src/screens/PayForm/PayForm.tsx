import React from 'react';
import {
  useEffect,
  useTranslation,
  useState,
  useRoute,
  useNavigation,
} from '@hooks';
import {FondyService} from '@httpServices';
import {WebView} from 'react-native-webview';

import styles from './styles';
import {KeyboardAvoidingView} from '@components';
import ShowLoading from './components/ShowLoading/ShowLoading';

//Types
type TProps = {};
import {PayFormRouteProp, TParamOfPayForm} from '@types';


const userAgent =
  'Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19';

const INJECTED_JAVASCRIPT = `(function() {
  window.ReactNativeWebView.postMessage('loaded');
})();`;

const getFondyForm = async (
  args: TParamOfPayForm,
  setUriFunc: (uri: string) => void,
) => {
  const {data} = await FondyService.getFondyForm(args);
  setUriFunc(data);
};

const PayForm: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();
  const [uri, setUri] = useState('');
  const {params} = useRoute<PayFormRouteProp>();
  const {setOptions} = useNavigation();
  const [isShowLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (params) {
      if (params?.phone) {
        setOptions({
          title: `${t('ForPhone')}: ${params.phone}`,
        });
      }
      getFondyForm(params, setUri);
    }
  }, [params, setOptions, t]);

  const parserOnMessage = (data: any) => {
    if (data?.nativeEvent?.loading) {
      setShowLoading(false);
      // console.log('\nMESSAGE', data?.nativeEvent);
    }

    if (data?.nativeEvent?.error) {
      setShowLoading(false);
      console.log('\nerror', data?.nativeEvent?.error);
    }
  };

  const onLoadStart = (navState: any) => {
    // console.log('\n>>>>>> onLoadStart', navState?.nativeEvent?.url);
  };

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
