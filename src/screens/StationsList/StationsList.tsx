/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {useEffect, useCallback, useState, useMemo} from '@hooks';
import {
  View,
  ScrollView,
  Geolocation,
  Linking,
  RefreshControl,
} from '@components';
import {Search, StationListItem, NothingFoundItem} from './components';
import {connect} from 'react-redux';
import {navigate} from '@services';
import {getUrlForRoute, animation, openAppSettings} from '@helpers';
import styles from './styles';
import {getFilteredPetrolStationList} from '@helpers';
import {setGPS} from '@reducers/appGlobalState';

//Type
import {TFilters, TGlobalState, TPetrolStation} from '@types';
import {Dispatch} from 'redux';
import {getPetrolStations} from '@reducers/petrolStations';
import {colors} from '@constants';

type TProps = {
  dispatch: Dispatch;
  filters: TFilters;
  isGPS: boolean;
  petrolStations: TPetrolStation[];
  textOfSearch: string;
  loading: boolean;
};

type TSelected = number | null;

const StationsList: React.FC<TProps> = ({
  dispatch,
  filters,
  isGPS,
  petrolStations,
  textOfSearch,
  loading,
}) => {
  const [stations, setStations] = useState(
    getFilteredPetrolStationList({
      stations: petrolStations,
      filters,
      textOfSearch,
    }),
  );

  useEffect(() => {
    setStations(
      getFilteredPetrolStationList({
        stations: petrolStations,
        filters,
        textOfSearch,
      }),
    );
  }, [filters, petrolStations, textOfSearch]);

  const refresh = useCallback(() => {
    dispatch(getPetrolStations());
  }, []);

  const openDetailOfStation = (id: number): void => {
    if (!id) {
      return;
    }
    navigate('StationsStack', {
      screen: 'MarkerDetail',
      params: {
        markerId: id,
      },
    });
  };

  const getRoute = (id: number): void => {
    if (!id) {
      return;
    }
    // setSelectedId(id);
    const data = stations.filter(i => i.id === id)[0] || null;
    if (!data) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        dispatch(setGPS(true));
        const urlForRoute = getUrlForRoute({
          startLatitude: position?.coords?.latitude || 0,
          startLongitude: position?.coords?.longitude || 0,
          endLatitude: data?.lat,
          endLongitude: data?.long,
        });
        Linking.openURL(urlForRoute);
      },
      error => {
        dispatch(setGPS(false));
        openAppSettings();
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const refreshControl = useMemo(() => {
    return (
      <RefreshControl
        onRefresh={refresh}
        refreshing={loading}
        colors={[colors.green_27A74C]}
        tintColor={colors.green_27A74C}
        size={24}
      />
    );
  }, [loading]);

  return (
    <View style={styles.container}>
      <Search textOfSearch={textOfSearch} />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={refreshControl}
        keyboardShouldPersistTaps="always">
        {stations.map(item => {
          return (
            <StationListItem
              item={item}
              key={`${item.id}`}
              // selected={item.id === selectedId}
              onShowDetails={openDetailOfStation}
              getRoute={getRoute}
            />
          );
        })}
      </ScrollView>
      {!stations.length && <NothingFoundItem />}
      <View style={styles.footer} />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  petrolStations: state.petrolStations.data,
  loading: state.petrolStations.loading,
  filters: state.filters,
  textOfSearch: state.searchStations.textOfSearch,
  isGPS: state.appGlobalState.gps,
});

export default connect(mapStateToProps)(StationsList);
