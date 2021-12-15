import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from '@screens';
import {defaultStackOptions} from '../options';
import {TGlobalState, TProfile} from '@types';
import {connect} from 'react-redux';

type TProps = {
  profile: TProfile;
};

const ProfileStack = createStackNavigator();

const ProfileScreen: React.FC<TProps> = ({profile}) => {
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
    </ProfileStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
});

export default connect(mapStateToProps)(ProfileScreen);
