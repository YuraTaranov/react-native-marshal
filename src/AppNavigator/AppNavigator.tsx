import React from 'react';
import {Dispatch} from 'redux';
import i18next from 'i18next';
import {connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from '@hooks';
import NetInfo from '@react-native-community/netinfo';
import {setIsConnected} from '@reducers/network';
import {navigationRef, onStateChange} from '@services';

import RootStackNavigator from './stacks/RootStackNavigator';

//types
import {TGlobalState} from '@types';
import {locale} from '../services/localization/i18n';
import {changeLang} from '@reducers/appGlobalState';

const InitialStack = createStackNavigator();

type TProps = {
  dispatch: Dispatch;
  appGlobalState: TGlobalState['appGlobalState'];
};

const AppNavigator: React.FC<TProps> = ({dispatch, appGlobalState}) => {
  useEffect(() => {
    if (!appGlobalState.lang) {
      dispatch(changeLang(locale));
    } else {
      if (appGlobalState.lang === 'ru') {
        i18next.changeLanguage('uk');
      } else {
        i18next.changeLanguage(appGlobalState.lang);
      }
    }
  }, [appGlobalState.lang]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setIsConnected(state.isConnected));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <InitialStack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <InitialStack.Screen
          name="RootStackNavigator"
          component={RootStackNavigator}
        />
      </InitialStack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  appGlobalState: state.appGlobalState,
});

export default connect(mapStateToProps)(AppNavigator);
