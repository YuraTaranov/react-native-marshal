import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoyaltyTerms, InviteFriends} from '@screens';
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
        name="LoyaltyTerms"
        component={LoyaltyTerms}
        options={{
          headerTitleAlign: 'center',
          title: t('Умови лояльності'),
        }}
      />
      <BonusesStack.Screen
        name="InviteFriends"
        component={InviteFriends}
        options={{
          headerTitleAlign: 'center',
          title: t('Запросити друзів'),
        }}
      />
    </BonusesStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(BonusesStackNavigator);
