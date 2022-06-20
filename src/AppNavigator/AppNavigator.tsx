import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Dispatch} from 'redux';
import i18next from 'i18next';
import {connect} from 'react-redux';
import {useEffect} from '@hooks';
import {TGlobalState} from '@types';
import {navigationRef, onStateChange} from '@services';
import {SplashScreenAnimation} from '@screens';
import RootStackNavigator from './stacks/RootStackNavigator';
import NetInfo from '@react-native-community/netinfo';
import {setIsConnected} from '@reducers/network';

const InitialStack = createStackNavigator();

type TProps = {
  dispatch: Dispatch;
  appGlobalState: TGlobalState['appGlobalState'];
};

const AppNavigator: React.FC<TProps> = ({dispatch, appGlobalState}) => {
  useEffect(() => {
    i18next.changeLanguage(appGlobalState.lang);
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
        screenOptions={{headerShown: false, gestureEnabled: false}}
        initialRouteName="SplashScreenAnimation">
        <InitialStack.Screen
          name="SplashScreenAnimation"
          component={SplashScreenAnimation}
        />
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
