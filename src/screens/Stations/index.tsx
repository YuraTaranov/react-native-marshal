// @ts-nocheck
import React from 'react';
import {SafeAreaView, StatusBar, useWindowDimensions} from 'react-native';
import {MapScreen, StationsList} from '@screens';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {connect} from 'react-redux';
import {useCallback, useEffect, useState, useTranslation} from '@hooks';
import {colors} from '@constants';
import {navigate} from '@services';
import styles from './styles';
import {TFilters, TGlobalState} from '@types';
import ButtonCustom from './components/ButtonCustom/ButtonCustom';
// import filters from '@reducers/filters';

type TProps = {
  filters: TFilters;
};

type TRenderTabBarParams = {
  position: object;
  layout: object;
  jumpTo: Function;
  navigationState: object;
};

const Stations: React.FC<TProps> = ({filters}) => {
  const {t} = useTranslation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [isFilterEmpty, setIsFilterEmpty] = useState(true);
  const [routes] = useState([
    {key: 'first', title: t('map.tabMapFirst')},
    {key: 'second', title: t('map.tabMapSecond')},
  ]);

  const renderScene = SceneMap({
    first: MapScreen,
    second: StationsList,
  });

  const renderTabBar = useCallback(
    (props: TRenderTabBarParams) => (
      <SafeAreaView style={styles.whiteFond}>
        <TabBar
          {...props}
          indicatorStyle={styles.tabBarIndicatorStyle}
          style={[styles.whiteFond, styles.barTitle]}
          labelStyle={styles.tabBarLabelStyle}
          activeColor={colors.red_CA001A}
          inactiveColor={colors.black_1E1A1A}
        />
      </SafeAreaView>
    ),
    [],
  );

  const navigateToFilter = useCallback(() => {
    navigate('StationsStack', {
      screen: 'FilterPage',
    });
  }, []);

  useEffect(() => {
    setIsFilterEmpty(
      filters.fuelTypes.length === 0 && filters.regions.length === 0,
    );
  }, [filters]);

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
      <ButtonCustom onPress={navigateToFilter} isFilterEmpty={isFilterEmpty} />
    </>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(Stations);
