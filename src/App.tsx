import React from 'react';
import storage from './store';
import {StatusBar} from 'react-native';
import AppNavigator from './AppNavigator/AppNavigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {colors} from '@constants';
import {Loader} from '@components';

const App: React.FC = () => {
  return (
    <Provider store={storage.store}>
      <PersistGate loading={null} persistor={storage.persistor}>
        <StatusBar
          backgroundColor={colors.green_27A74C}
          barStyle="light-content"
        />
        <Loader>
          <AppNavigator />
        </Loader>
      </PersistGate>
    </Provider>
  );
};

export default App;
