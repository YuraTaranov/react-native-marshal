import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile, Cars, AddCar, Settings, ProfileEdit} from '@screens';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {useTranslation} from '@hooks';
import {defaultStackOptions} from '../options';

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
        name="Profile"
        component={Profile}
        options={{
          // FIXME:
          headerTitleAlign: 'center',
          title: 'Ім’я Прізвище',
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
    </ProfileStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(ProfileStackNavigator);
