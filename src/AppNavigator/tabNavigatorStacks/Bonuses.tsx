import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Bonuses, BonusesOnBoarding} from '@screens';
import {useTranslation} from '@hooks';
import {defaultStackOptions} from '../options';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';

type TProps = {
  bonusesOnBoarding: boolean;
};

const BonusesStack = createStackNavigator();

const BonusesScreen: React.FC<TProps> = ({bonusesOnBoarding}) => {
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
    </BonusesStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  bonusesOnBoarding: state.appGlobalState.bonusesOnBoarding,
});

export default connect(mapStateToProps)(BonusesScreen);
