import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Dispatch} from 'redux';
import i18next from 'i18next';
import {connect} from 'react-redux';
import {useEffect} from '@hooks';
import {TGlobalState} from '@types';
import AuthStackNavigator from './stacks/AuthStackNavigator';
import TabNavigator from './TabNavigator';
import OnboardingStackNavigator from './stacks/OnboardingStackNavigator';
import {navigationRef, onStateChange} from '@services';

const RootStack = createStackNavigator();

const AppNavigator: React.FC<TProps> = ({appGlobalState}) => {
  useEffect(() => {
    i18next.changeLanguage(appGlobalState.lang);
  }, [appGlobalState]);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <RootStack.Navigator
        headerMode="none"
        screenOptions={{
          gestureEnabled: false,
        }}>
        {appGlobalState.onBoarding ? (
          <RootStack.Screen
            name={'Onboarding'}
            component={OnboardingStackNavigator}
          />
        ) : !appGlobalState.accessToken ? (
          <RootStack.Screen
            name="AuthNavigator"
            component={AuthStackNavigator}
          />
        ) : (
          <RootStack.Screen name="TabNavigator" component={TabNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  appGlobalState: state.appGlobalState,
});

export default connect(mapStateToProps)(AppNavigator);

type TProps = {
  dispatch: Dispatch;
  appGlobalState: TGlobalState['appGlobalState'];
};
