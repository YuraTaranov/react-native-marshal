import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Stations, FilterPage, MarkerDetailPage} from '@screens';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
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
        name="FilterPage"
        component={FilterPage}
        options={{
          headerTitleAlign: 'center',
          title: 'Stations',
        }}
      />
      <StationsStack.Screen
        name="MarkerDetail"
        component={MarkerDetailPage}
        options={{
          headerTitleAlign: 'center',
          title: 'Stations',
        }}
      />
    </StationsStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(StationsStackNavigator);
