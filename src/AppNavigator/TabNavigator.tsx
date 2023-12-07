import React, {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar, Wrapper} from '@components';
import {useCallback} from '@hooks';
import {TGlobalState} from '@types';
import Home from './tabNavigatorStacks/Home';
import Promotions from './tabNavigatorStacks/Promotions';
import Stations from './tabNavigatorStacks/Stations';
import Bonuses from './tabNavigatorStacks/Bonuses';
import Profile from './tabNavigatorStacks/Profile';
import {Dispatch} from 'redux';
import {getCards} from '@reducers/cards';
import {getNotificationsCount} from '@reducers/notifications';

const TabStack = createBottomTabNavigator();

type TProps = {
  dispatch: Dispatch;
  showFilterPage?: boolean;
};

const TabNavigator: React.FC<TProps> = ({dispatch}) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        dispatch(getCards());
        dispatch(getNotificationsCount());
      } else if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
      }
      appState.current = nextAppState;
    });

    return () => {
      AppState.removeEventListener('change', () => {});
    };
  }, []);
  const renderTab = useCallback((props: any) => <TabBar {...props} />, []);

  return (
    <Wrapper>
      <TabStack.Navigator initialRouteName={'Home'} tabBar={renderTab}>
        <TabStack.Screen name={'Stations'} component={Stations} />
        <TabStack.Screen name={'Promotions'} component={Promotions} />
        <TabStack.Screen name={'Home'} component={Home} />
        <TabStack.Screen name={'Bonuses'} component={Bonuses} />
        <TabStack.Screen name={'Profile'} component={Profile} />
      </TabStack.Navigator>
    </Wrapper>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(TabNavigator);
