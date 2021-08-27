import React from 'react';

import {useEffect, useCallback, useState} from '@hooks';
import {View, ScrollView, Geolocation, Linking} from '@components';
import {Search, StationListItem} from './components';
import {connect} from 'react-redux';
import {navigate} from '@services';
import {getUrlForRoute, animation, isSearch} from '@helpers';
import styles from './styles';
import {getFilteredPetrolStationList} from '@helpers';

//Type
import {TFilters, TGlobalState, TPetrolStation} from '@types';
import {Dispatch} from 'redux';

type TProps = {
  dispatch: Dispatch;
  petrolStations: TPetrolStation[];
  filters: TFilters;
  textOfSearch: string;
};

type TSelected = number | null;

const StationsList: React.FC<TProps> = ({
  dispatch,
  petrolStations,
  filters,
  textOfSearch,
}) => {
  const [stations, setStations] = useState(
    getFilteredPetrolStationList({
      stations: petrolStations,
      filters,
    }),
  );

  const changeStationArray = useCallback(() => {
    animation();
    setStations(petrolStations.filter(i => isSearch(i, textOfSearch)));
  }, [textOfSearch, petrolStations]);

  useEffect(() => {
    changeStationArray();
  }, [changeStationArray, textOfSearch]);

  useEffect(() => {
    setStations(
      getFilteredPetrolStationList({
        stations: petrolStations,
        filters,
      }),
    );
  }, [filters, petrolStations]);

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
        const urlForROute = getUrlForRoute({
          startLatitude: position?.coords?.latitude || 0,
          startLongitude: position?.coords?.longitude || 0,
          endLatitude: data?.lat,
          endLongitude: data?.long,
        });
        Linking.openURL(urlForROute);
      },
      error => {
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
        {stations.map(item => (
          <StationListItem
            item={item}
            key={`${item.id}`}
            // selected={item.id === selectedId}
            onShowDetails={openDetailOfStation}
            getRoute={getRoute}
          />
        ))}
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  petrolStations: state.petrolStations,
  filters: state.filters,
  textOfSearch: state.searchStations.textOfSearch,
});

export default connect(mapStateToProps)(StationsList);
