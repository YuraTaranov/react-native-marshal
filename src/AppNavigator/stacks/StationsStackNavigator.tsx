import React from 'react';
import {ios} from '@constants';
import {createStackNavigator} from '@react-navigation/stack';
import {Stations, FilterPage, MarkerDetailPage, RegionsPage} from '@screens';
import {defaultStackOptions} from '../options';

type TProps = {};

const StationsStack = createStackNavigator();

const StationsStackNavigator: React.FC<TProps> = ({}) => {
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
      <StationsStack.Screen
        name="MarkerDetail"
        component={MarkerDetailPage}
        options={{
          headerTitleAlign: 'center',
          title: 'Detail',
        }}
      />
      <StationsStack.Screen
        name="FilterPage"
        component={FilterPage}
        options={{
          headerTitleAlign: 'center',
          //   animationEnabled: ios,
        }}
      />
      <StationsStack.Screen
        name="RegionsPage"
        component={RegionsPage}
        options={{
          headerTitleAlign: 'center',
          //   animationEnabled: ios,
        }}
      />
    </StationsStack.Navigator>
  );
};

export default StationsStackNavigator;
