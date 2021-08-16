// @ts-nocheck
import React from 'react';
import {SafeAreaView, StatusBar, useWindowDimensions} from 'react-native';
import {MapScreen, StationsList} from '@screens';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {connect} from 'react-redux';
import {
  useCallback,
  useEffect,
  useNavigation,
  useState,
  useTranslation,
} from '@hooks';
import {colors} from '@constants';
import {navigate} from '@services';
import styles from './styles';
import {TGlobalState} from '@types';
import ButtonCustom from './components/ButtonCustom/ButtonCustom';

type TProps = {};

type _t_renderTabBarParams = {
  position: object;
  layout: object;
  jumpTo: Function;
  navigationState: object;
};

const Stations: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: t('map.tabMapFirst')},
    {key: 'second', title: t('map.tabMapSecond')},
  ]);

  const renderScene = SceneMap({
    first: MapScreen,
    second: StationsList,
  });

  const renderTabBar = useCallback(
    (props: _t_renderTabBarParams) => (
      <SafeAreaView style={styles.whiteFond}>
        <TabBar
          {...props}
          indicatorStyle={styles.tabBarIndicatorStyle}
          style={[styles.whiteFond, styles.barTitle]}
          labelStyle={styles.tabBarLabelStyle}
          activeColor={colors.green_007E26}
          inactiveColor={colors.black_1E1A1A}
        />
      </SafeAreaView>
    ),
    [],
  );

  const navigateToFilter = useCallback(() => {
    navigate('FilterPage');
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.white_FFFFFF}
      />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
      <ButtonCustom onPress={navigateToFilter} />
    </>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(Stations);
