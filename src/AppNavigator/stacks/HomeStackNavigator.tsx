import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AddCard,
  FuelCalculator,
  FuelCalculatorResult,
  FuelPurchase,
  Home,
  PayForm,
  Promotion,
} from '@screens';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {useTranslation} from '@hooks';
import {ios} from '@components';
import {defaultStackOptions} from '../options';

type TProps = {};

const HomeStack = createStackNavigator();

const HomeStackNavigator: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();

  return (
    <HomeStack.Navigator
      // initialRouteName="PayForm"
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: 'center',
          title: 'Marshal',
        }}
      />
      <HomeStack.Screen
        name="Promotion"
        component={Promotion}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name="FuelCalculator"
        component={FuelCalculator}
        options={{
          headerTitleAlign: 'center',
          title: t('FuelCalculator'),
        }}
      />
      <HomeStack.Screen
        name="FuelCalculatorResult"
        component={FuelCalculatorResult}
        options={{
          headerTitleAlign: 'center',
          title: t('FuelCalculator'),
        }}
      />
      <HomeStack.Screen
        name="FuelPurchase"
        component={FuelPurchase}
        options={{
          headerTitleAlign: 'center',
          title: t('FuelPurchase'),
        }}
      />
      <HomeStack.Screen
        name="PayForm"
        component={PayForm}
        options={{
          headerTitleAlign: 'center',
          // title: t('PayForm'),
        }}
      />
      <HomeStack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          headerTitleAlign: 'center',
          title: t('Add_Card'),
          animationEnabled: ios,
        }}
      />
    </HomeStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(HomeStackNavigator);
