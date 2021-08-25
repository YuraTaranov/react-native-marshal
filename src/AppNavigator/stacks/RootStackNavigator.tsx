import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import OnboardingStackNavigator from './OnboardingStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import TabNavigator from '../TabNavigator';

type TProps = {
  appGlobalState: TGlobalState['appGlobalState'];
};

const RootStack = createStackNavigator();

const HomeStackNavigator: React.FC<TProps> = ({appGlobalState}) => {
  return (
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
      ) : !appGlobalState.isUserAuthorized ? (
        <RootStack.Screen name="AuthNavigator" component={AuthStackNavigator} />
      ) : (
        <RootStack.Screen name="TabNavigator" component={TabNavigator} />
      )}
    </RootStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  appGlobalState: state.appGlobalState,
});

export default connect(mapStateToProps)(HomeStackNavigator);
