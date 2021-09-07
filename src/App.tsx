import React from 'react';
import storage from './store';
import {StatusBar} from 'react-native';
import AppNavigator from './AppNavigator/AppNavigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {colors} from '@constants';
import {Loader, DeepLinksManager} from '@components';
import {useEffect} from '@hooks';
import SplashScreen from 'react-native-splash-screen';

const App: React.FC = () => {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 500);
  }, []);

  return (
    <Provider store={storage.store}>
      <PersistGate loading={null} persistor={storage.persistor}>
        <StatusBar
          backgroundColor={colors.green_27A74C}
          barStyle="light-content"
        />
        <Loader>
          <AppNavigator />
          <DeepLinksManager />
        </Loader>
      </PersistGate>
    </Provider>
  );
};

export default App;
