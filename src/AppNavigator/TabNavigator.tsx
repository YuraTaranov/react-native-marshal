import React from 'react';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar, Wrapper} from '@components';
import {useCallback} from '@hooks';
import {TGlobalState} from '@types';
import HomeStackNavigator from './stacks/HomeStackNavigator';
import StationsStackNavigator from './stacks/StationsStackNavigator';
import PromotionsStackNavigator from './stacks/PromotionsStackNavigator';
import BonusesStackNavigator from './stacks/BonusesStackNavigator';
import ProfileStackNavigator from './stacks/ProfileStackNavigator';
import {Bonuses, Home, Profile, Promotions, Stations} from '@screens';

const TabStack = createBottomTabNavigator();

type TProps = {
  showFilterPage?: boolean;
};

const TabNavigator: React.FC<TProps> = ({}) => {
  const renderTab = useCallback((props: any) => <TabBar {...props} />, []);

  return (
    <Wrapper>
      <TabStack.Navigator initialRouteName={'Home'} tabBar={renderTab}>
        <TabStack.Screen name={'Stations'} component={StationsStackNavigator} />
        <TabStack.Screen
          name={'Promotions'}
          component={PromotionsStackNavigator}
        />
        <TabStack.Screen name={'Home'} component={HomeStackNavigator} />
        <TabStack.Screen name={'Bonuses'} component={BonusesStackNavigator} />
        <TabStack.Screen name={'Profile'} component={ProfileStackNavigator} />
        {/* <TabStack.Screen name={'Stations'} component={Stations} />
        <TabStack.Screen name={'Promotions'} component={Promotions} />
        <TabStack.Screen name={'Home'} component={Home} />
        <TabStack.Screen name={'Bonuses'} component={Bonuses} />
        <TabStack.Screen name={'Profile'} component={Profile} /> */}
      </TabStack.Navigator>
    </Wrapper>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(TabNavigator);
