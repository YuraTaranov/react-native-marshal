import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '@screens';
import { connect } from 'react-redux';
import { TGlobalState } from '@types';
import { useTranslation } from '@hooks';
import { defaultStackOptions } from '../options';

type TProps = {
}

const AuthStack = createStackNavigator();

const AuthStackNavigator: React.FC<TProps> = ({ }) => {

  const { t } = useTranslation()

  return (
    <AuthStack.Navigator screenOptions={{
      ...defaultStackOptions
    }} >
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          title: t('screen.title.login')
        }}
      />
    </AuthStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({

})

export default connect(mapStateToProps)(AuthStackNavigator)

