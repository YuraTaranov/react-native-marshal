import React from 'react';
import storage from './store';
import {StatusBar} from 'react-native';
import AppNavigator from './AppNavigator/AppNavigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {colors} from '@constants';
import {Loader, DeepLinksManager} from '@components';
import {useEffect, useTranslation} from '@hooks';
import SplashScreen from 'react-native-splash-screen';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import {NetInfoState} from '@react-native-community/netinfo';

const App: React.FC = () => {
  const {t} = useTranslation();

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 10);
  }, []);

  const onChangeNetworkState = (state: NetInfoState) => {};

  return (
    <Provider store={storage.store}>
      <PersistGate loading={null} persistor={storage.persistor}>
        <InternetConnectionAlert
          type="error"
          onChange={onChangeNetworkState}
          title={t(`Проблеми з мережею Інтернет`)}
          message={t(`Будь ласка перевірте з'єднання з Інтернетом`)}>
          <StatusBar
            backgroundColor={colors.green_27A74C}
            barStyle="light-content"
          />
          <Loader>
            <AppNavigator />
            <DeepLinksManager />
          </Loader>
        </InternetConnectionAlert>
      </PersistGate>
    </Provider>
  );
};

export default App;
