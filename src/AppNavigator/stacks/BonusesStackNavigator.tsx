import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Bonuses,
  LoyaltyTerms,
  InviteFriends,
  BonusesOnBoarding,
} from '@screens';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {useTranslation} from '@hooks';
import {defaultStackOptions} from '../options';

type TProps = {
  bonusesOnBoarding: boolean;
};

const BonusesStack = createStackNavigator();

const BonusesStackNavigator: React.FC<TProps> = ({bonusesOnBoarding}) => {
  const {t} = useTranslation();

  return (
    <BonusesStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <BonusesStack.Screen
        name={bonusesOnBoarding ? 'BonusesOnBoarding' : 'Bonuses'}
        component={bonusesOnBoarding ? BonusesOnBoarding : Bonuses}
        options={{
          headerTitleAlign: 'center',
          title: bonusesOnBoarding ? t('Запросити друзів') : t('Бонуси'),
        }}
      />
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

const mapStateToProps = (state: TGlobalState) => ({
  bonusesOnBoarding: state.appGlobalState.bonusesOnBoarding,
});

export default connect(mapStateToProps)(BonusesStackNavigator);
