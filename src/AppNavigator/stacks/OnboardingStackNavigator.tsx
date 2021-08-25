import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Onboarding} from '@screens';

type TProps = {};

const OnboardingStack = createStackNavigator();

const OnboardingStackNavigator: React.FC<TProps> = ({}) => {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <OnboardingStack.Screen name="Onboarding" component={Onboarding} />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingStackNavigator;
