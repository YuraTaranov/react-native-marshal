import React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import {
  useCallback,
  useState,
  useTranslation,
  useWindowDimensions,
} from '@hooks';

import {View} from '@components';
import {connect} from 'react-redux';
import {InnerPage} from './components';

import styles from './styles';
import {colors} from '@constants';

//Type
import {TGlobalState} from '@types';
import {Dispatch} from 'redux';

type TProps = {
  dispatch: Dispatch;
};

type TRenderTabBarParams = {
  position: object;
  layout: object;
  jumpTo: Function;
  navigationState: object;
};

const FuelPurchase: React.FC<TProps> = ({dispatch}) => {
  const {t} = useTranslation();
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'first', title: t('BuyYourself')},
    {key: 'second', title: t('BuyForFriend')},
  ]);

  const Empty = () => <View />;
  const renderScene = SceneMap({
    first: Empty,
    second: Empty,
  });

  const renderTabBar = useCallback(
    (props: TRenderTabBarParams) => (
      <TabBar
        {...props}
        indicatorStyle={styles.tabBarIndicatorStyle}
        style={[styles.whiteFond, styles.barTitle]}
        labelStyle={styles.tabBarLabelStyle}
        activeColor={colors.green_00AE36}
        inactiveColor={colors.black_1E1A1A}
      />
    ),
    [],
  );

  return (
    <>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        keyboardDismissMode="auto"
      />
      <InnerPage index={index} />
    </>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  // reducer: state.reducer
});

export default connect(mapStateToProps)(FuelPurchase);
