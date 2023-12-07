import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  FuelCalculator,
  FuelCalculatorResult,
  FuelPurchase,
  PayForm,
  Promotion,
  RegionsPage,
} from '@screens';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {useTranslation} from '@hooks';
import {defaultStackOptions} from '../options';

type TProps = {};

const HomeStack = createStackNavigator();

const HomeStackNavigator: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();

  return (
    <HomeStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
      }}>
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
          title: t('PayForm'),
        }}
      />
      <HomeStack.Screen
        name="RegionsPage"
        component={RegionsPage}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </HomeStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(HomeStackNavigator);
