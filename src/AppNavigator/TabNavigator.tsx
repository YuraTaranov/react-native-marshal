import React from 'react';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar, Wrapper} from '@components';
import {TGlobalState} from '@types';
import HomeStackNavigator from './stacks/HomeStackNavigator';
import StationsStackNavigator from './stacks/StationsStackNavigator';
import PromotionsStackNavigator from './stacks/PromotionsStackNavigator';
import BonusesStackNavigator from './stacks/BonusesStackNavigator';
import ProfileStackNavigator from './stacks/ProfileStackNavigator';

const TabStack = createBottomTabNavigator();

type TProps = {
  showFilterPage?: boolean;
};

const TabNavigator: React.FC<TProps> = ({}) => {
  const renderTab = (props: any) => <TabBar {...props} />;

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
      </TabStack.Navigator>
    </Wrapper>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(TabNavigator);
