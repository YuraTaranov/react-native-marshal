import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '@screens';
import {defaultStackOptions} from '../options';

const HomeStack = createStackNavigator();

const HomeScreen: React.FC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <HomeStack.Screen
        name={'Home'}
        component={Home}
        options={{
          headerTitleAlign: 'center',
          title: '',
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreen;
