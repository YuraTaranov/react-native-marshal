import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '@screens';
import { connect } from 'react-redux';
import { TGlobalState } from '@types';
import { useTranslation } from '@hooks';
import { defaultStackOptions } from '../options';

type TProps = {
}

const HomeStack = createStackNavigator();

const HomeStackNavigator: React.FC<TProps> = ({ }) => {

  const { t } = useTranslation()

  return (
    <HomeStack.Navigator screenOptions={{
      ...defaultStackOptions
    }} >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home'
        }}
      />
    </HomeStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({

})

export default connect(mapStateToProps)(HomeStackNavigator)

