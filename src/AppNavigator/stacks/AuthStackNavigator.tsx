import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { CodeConfirm, Login, Onboarding, Registration } from '@screens';
import { connect } from 'react-redux';
import { TGlobalState } from '@types';
import { useTranslation } from '@hooks';
import { defaultStackOptions } from '../options';
import { Icon, View, Wrapper } from '@components';
import { colors } from '@constants';

type TProps = {
}

const AuthStack = createStackNavigator();

const AuthStackNavigator: React.FC<TProps> = ({ }) => {

  const { t } = useTranslation()

  return (
    <Wrapper>
      <AuthStack.Navigator initialRouteName={'Registration'} screenOptions={{
        ...defaultStackOptions,
        headerBackImage: () => <Icon name={'left'} color={colors.white_FFFFFF} size={24} />,
      }} >
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitleAlign: 'center',
            title: t('screen.title.gettingStarted')
          }}
        />
        <AuthStack.Screen
          name="CodeConfirm"
          component={CodeConfirm}
          options={{
            headerTitleAlign: 'center',
            title: t('screen.title.gettingStarted')
          }}
        />
        <AuthStack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTitleAlign: 'center',
            title: t('screen.title.gettingStarted')
          }}
        />
      </AuthStack.Navigator>
    </Wrapper>

  );
};

const mapStateToProps = (state: TGlobalState) => ({

})

export default connect(mapStateToProps)(AuthStackNavigator)

