import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AboutApp,
  AddCar,
  AddCard,
  Cars,
  LoyaltyTerms,
  MyCards,
  NotificationSettings,
  Profile,
  ProfileEdit,
  Purchases,
  Settings,
  UseTerms,
  Notifications,
  Promotion,
} from '@screens';
import {connect} from 'react-redux';
import {TGlobalState, TProfile} from '@types';
import {useTranslation} from '@hooks';
import {ios} from '@constants';
import {defaultStackOptions} from '../options';

type TProps = {
  profile: TProfile;
};

const ProfileStack = createStackNavigator();

const ProfileStackNavigator: React.FC<TProps> = ({profile}) => {
  const {t} = useTranslation();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleAlign: 'center',
          title: profile?.name ? `${profile?.name} ${profile?.surname}` : '',
        }}
      />
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
        name="Purchases"
        component={Purchases}
        options={{
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
        name="AddCard"
        component={AddCard}
        options={{
          headerTitleAlign: 'center',
          title: t('Add_Card'),
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
        name="Promotion"
        component={Promotion}
        options={{
          headerTitleAlign: 'center',
          title: t('Умови акції'),
        }}
      />
    </ProfileStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
});

export default connect(mapStateToProps)(ProfileStackNavigator);
