import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '@screens';
import { connect } from 'react-redux';
import { TGlobalState } from '@types';
import { useTranslation } from '@hooks';
import { defaultStackOptions } from '../options';


type TProps = {
}

const ProfileStack = createStackNavigator();

const ProfileStackNavigator: React.FC<TProps> = ({ }) => {

  const { t } = useTranslation()

  return (
    <ProfileStack.Navigator screenOptions={{
      ...defaultStackOptions
    }} >
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile'
        }}
      />
    </ProfileStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({

})

export default connect(mapStateToProps)(ProfileStackNavigator)

