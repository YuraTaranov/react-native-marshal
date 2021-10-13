import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Promotions, Promotion} from '@screens';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {useTranslation} from '@hooks';
import {defaultStackOptions} from '../options';

type TProps = {};

const PromotionsStack = createStackNavigator();

const PromotionsStackNavigator: React.FC<TProps> = ({}) => {
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
      <PromotionsStack.Screen
        name="Promotion"
        component={Promotion}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </PromotionsStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(PromotionsStackNavigator);
