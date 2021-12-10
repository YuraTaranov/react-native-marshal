import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import OnboardingStackNavigator from './OnboardingStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import TabNavigator from '../TabNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import BonusesStackNavigator from './BonusesStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import StationsStackNavigator from './StationsStackNavigator';
import PromotionsStackNavigator from './PromotionsStackNavigator';
import {AddCar, Cars} from '@screens';
import {defaultStackOptions} from '../options';

type TProps = {
  appGlobalState: TGlobalState['appGlobalState'];
};

const RootStack = createStackNavigator();

const RootStackNavigator: React.FC<TProps> = ({appGlobalState}) => {
  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
        // ...defaultStackOptions,
      }}>
      {appGlobalState.onBoarding ? (
        <RootStack.Screen
          name={'Onboarding'}
          component={OnboardingStackNavigator}
        />
      ) : !appGlobalState.isUserAuthorized ? (
        <RootStack.Screen name="AuthNavigator" component={AuthStackNavigator} />
      ) : (
        <>
          <RootStack.Screen name="TabNavigator" component={TabNavigator} />
          {/* <RootStack.Screen
            name="Stations"
            component={StationsStackNavigator}
          />
          <RootStack.Screen
            name="Promotions"
            component={PromotionsStackNavigator}
          />
          <RootStack.Screen name="Home" component={HomeStackNavigator} />
          <RootStack.Screen
            name="Cars"
            component={Cars}
            options={{
              headerTitleAlign: 'center',
              title: 'Авто',
            }}
          />
          <RootStack.Screen name="Bonuses" component={BonusesStackNavigator} />
          <RootStack.Screen
            name="ProfileStack"
            component={ProfileStackNavigator}
          /> */}
        </>
      )}
    </RootStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  appGlobalState: state.appGlobalState,
});

export default connect(mapStateToProps)(RootStackNavigator);
