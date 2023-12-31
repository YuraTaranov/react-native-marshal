import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AboutApp,
  AddCar,
  Cars,
  LoyaltyTerms,
  MyCards,
  NotificationSettings,
  ProfileEdit,
  Purchases,
  Settings,
  UseTerms,
  Notifications,
  Promotion,
  PayForm,
  PurchaseDetail,
  PrivacyPolicy,
  NotificationsDetail,
} from '@screens';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {useTranslation} from '@hooks';
import {ios} from '@constants';
import {darkRedOptions, defaultStackOptions} from '../options';

type TProps = {};

const ProfileStack = createStackNavigator();

const ProfileStackNavigator: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <ProfileStack.Screen
        name="Cars"
        component={Cars}
        options={{
          headerTitleAlign: 'center',
          title: t('Авто'),
        }}
      />
      <ProfileStack.Screen
        name="AddCar"
        component={AddCar}
        options={{
          headerTitleAlign: 'center',
          title: t('Додати авто'),
        }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitleAlign: 'center',
          title: t('Налаштування'),
        }}
      />
      <ProfileStack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{
          headerTitleAlign: 'center',
          title: t('Редагувати профіль'),
        }}
      />
      <ProfileStack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{
          headerTitleAlign: 'center',
          title: t('Сповіщення'),
        }}
      />
      <ProfileStack.Screen
        name="AboutApp"
        component={AboutApp}
        options={{
          headerTitleAlign: 'center',
          title: t('Про додаток'),
        }}
      />
      <ProfileStack.Screen
        name="LoyaltyTerms"
        component={LoyaltyTerms}
        options={{
          headerTitleAlign: 'center',
          title: t('Умови лояльності'),
        }}
      />
      <ProfileStack.Screen
        name="UseTerms"
        component={UseTerms}
        options={{
          headerTitleAlign: 'center',
          title: t('Умови використання'),
        }}
      />
      <ProfileStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerTitleAlign: 'center',
          title: t('Політика конфіденційності'),
        }}
      />
      <ProfileStack.Screen
        name="Purchases"
        component={Purchases}
        options={{
          ...darkRedOptions,
          headerTitleAlign: 'center',
          title: t('Мої покупки'),
        }}
      />
      <ProfileStack.Screen
        name="MyCards"
        component={MyCards}
        options={{
          headerTitleAlign: 'center',
          title: t('Мої картки'),
          animationEnabled: ios,
        }}
      />
      <ProfileStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerTitleAlign: 'center',
          title: t('Сповіщення'),
        }}
      />
      <ProfileStack.Screen
        name="NotificationsDetail"
        component={NotificationsDetail}
        options={{
          ...darkRedOptions,
          headerTitleAlign: 'center',
          title: '',
        }}
      />
      <ProfileStack.Screen
        name="Promotion"
        component={Promotion}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <ProfileStack.Screen
        name="PayForm"
        component={PayForm}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <ProfileStack.Screen
        name="PurchaseDetail"
        component={PurchaseDetail}
        options={{
          ...darkRedOptions,
          headerTitleAlign: 'center',
          title: t('Мої покупки'),
        }}
      />
    </ProfileStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(ProfileStackNavigator);
