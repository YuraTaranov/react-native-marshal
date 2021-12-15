import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Stations} from '@screens';
import {defaultStackOptions} from '../options';

const StationsStack = createStackNavigator();

const StationsScreen: React.FC = () => {
  return (
    <StationsStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <StationsStack.Screen
        name="Stations"
        component={Stations}
        options={{
          headerShown: false,
        }}
      />
    </StationsStack.Navigator>
  );
};

export default StationsScreen;
