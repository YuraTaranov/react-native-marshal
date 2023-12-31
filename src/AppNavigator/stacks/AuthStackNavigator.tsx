import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CodeConfirm,
  Login,
  Registration,
  BonusCardCheck,
  Biometrics,
} from '@screens';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {useTranslation} from '@hooks';
import {defaultStackOptions} from '../options';
import {Icon, Wrapper} from '@components';
import {colors} from '@constants';

type TProps = {};

const AuthStack = createStackNavigator();

const AuthStackNavigator: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();

  return (
    <Wrapper>
      <AuthStack.Navigator
        initialRouteName={'Login'}
        screenOptions={{
          ...defaultStackOptions,
          headerBackImage: () => (
            <Icon name={'left'} color={colors.black_000000} size={24} />
          ),
        }}>
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitleAlign: 'center',
            title: t('screen.title.gettingStarted'),
          }}
        />
        <AuthStack.Screen
          name="CodeConfirm"
          component={CodeConfirm}
          options={{
            headerTitleAlign: 'center',
            title: t('screen.title.gettingStarted'),
          }}
        />
        <AuthStack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTitleAlign: 'center',
            title: t('screen.title.gettingStarted'),
          }}
        />
        <AuthStack.Screen
          name="BonusCardCheck"
          component={BonusCardCheck}
          options={{
            headerTitleAlign: 'center',
            title: t('screen.title.gettingStarted'),
          }}
        />
        <AuthStack.Screen
          name="Biometrics"
          component={Biometrics}
          options={{
            headerTitleAlign: 'center',
            title: t('screen.title.gettingStarted'),
          }}
        />
      </AuthStack.Navigator>
    </Wrapper>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(AuthStackNavigator);
