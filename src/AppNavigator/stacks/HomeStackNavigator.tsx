import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Promotion} from '@screens';
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
          title: t('Умови акції'),
        }}
      />
    </HomeStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(HomeStackNavigator);
