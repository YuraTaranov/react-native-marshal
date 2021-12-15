import React from 'react';
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

const TabStack = createBottomTabNavigator();

type TProps = {
  showFilterPage?: boolean;
};

const TabNavigator: React.FC<TProps> = ({}) => {
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
