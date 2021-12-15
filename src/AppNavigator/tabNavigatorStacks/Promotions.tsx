import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Promotions} from '@screens';
import {useTranslation} from '@hooks';
import {defaultStackOptions} from '../options';

const PromotionsStack = createStackNavigator();

const PromotionsScreen: React.FC = () => {
  const {t} = useTranslation();

  return (
    <PromotionsStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <PromotionsStack.Screen
        name="Promotions"
        component={Promotions}
        options={{
          headerTitleAlign: 'center',
          title: t('Акції'),
        }}
      />
    </PromotionsStack.Navigator>
  );
};

export default PromotionsScreen;
