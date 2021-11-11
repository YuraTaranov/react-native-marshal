/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {useEffect, useCallback, useState} from '@hooks';
import {View, ScrollView, Geolocation, Linking} from '@components';
import {Search, StationListItem, NothingFoundItem} from './components';
import {connect} from 'react-redux';
import {navigate} from '@services';
import {getUrlForRoute, animation} from '@helpers';
import styles from './styles';
import {getFilteredPetrolStationList} from '@helpers';
import {setGPS} from '@reducers/appGlobalState';

//Type
import {TFilters, TGlobalState, TPetrolStation} from '@types';
import {Dispatch} from 'redux';

type TProps = {
  dispatch: Dispatch;
  filters: TFilters;
  isGPS: boolean;
  petrolStations: TPetrolStation[];
  textOfSearch: string;
};

type TSelected = number | null;

const StationsList: React.FC<TProps> = ({
  dispatch,
  filters,
  isGPS,
  petrolStations,
  textOfSearch,
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

  const openDetailOfStation = (id: number): void => {
    if (!id) {
      return;
    }
    navigate('MarkerDetail', {markerId: id});
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
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={styles.container}>
      <Search textOfSearch={textOfSearch} />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
        bounces>
        {stations.map(item => {
          animation('ios');
          return (
            <StationListItem
              item={item}
              key={`${item.id}`}
              // selected={item.id === selectedId}
              onShowDetails={openDetailOfStation}
              getRoute={getRoute}
              showRouteButton={isGPS}
            />
          );
        })}
        {!stations.length && <NothingFoundItem />}
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  petrolStations: state.petrolStations,
  filters: state.filters,
  textOfSearch: state.searchStations.textOfSearch,
  isGPS: state.appGlobalState.gps,
});

export default connect(mapStateToProps)(StationsList);
