import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Bonuses} from '@screens';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {useTranslation} from '@hooks';
import {defaultStackOptions} from '../options';

type TProps = {};

const BonusesStack = createStackNavigator();

const BonusesStackNavigator: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();

  return (
    <BonusesStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <BonusesStack.Screen
        name="Bonuses"
        component={Bonuses}
        options={{
          headerTitleAlign: 'center',
          title: 'Bonuses',
        }}
      />
    </BonusesStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(BonusesStackNavigator);
