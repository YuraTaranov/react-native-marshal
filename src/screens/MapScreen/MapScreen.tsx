/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback} from 'react';
import {useEffect, useState, useRef, useMemo} from '@hooks';
import {
  Geolocation,
  MapView,
  Marker,
  PERMISSIONS,
  PROVIDER_GOOGLE,
  PermissionsAndroid,
  View,
  request,
} from '@components';
import {MapButton, MarkerModal, ClusterMarker, MarkerItem} from './components';
import {connect} from 'react-redux';
import {colors, ios} from '@constants';
import {navigate} from '@services';
import {useIsFocused} from '@react-navigation/core';
import {getFilteredPetrolStationList, isSearch} from '@helpers';
import styles from './styles';

// Types
import {TGlobalState, TPetrolStation, TFullMarker, TFilters} from '@types';
import {Dispatch} from 'redux';

const {getCurrentPosition} = Geolocation;

const initRegion = {
  latitude: 49.9882292,
  longitude: 36.2258057,
  //   latitudeDelta: 0.015,
  latitudeDelta: 0.05,
  //   longitudeDelta: 0.0121,
  longitudeDelta: 0.05,
};
const K = 2.0;

type TRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
type TProps = {
  // dispatch: Dispatch;
  markers: Array<TPetrolStation>;
  filters: TFilters;
  textOfSearch: string;
};
type TCoords = {
  longitude: number;
  latitude: number;
};
type TPosition = {
  coords: TCoords;
};
export type TMarker = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  showDetails?: boolean;
} | null;

type TPoint = {
  latitude: number;
  longitude: number;
};

function formatLatLong(position: TPosition): TCoords {
  if (!position?.coords) {
    // return {};
    return initRegion;
  }
  const {latitude, longitude} = position.coords;
  return {latitude, longitude};
}

function formatMarkerData(ArrayMarkers: Array<TFullMarker>): Array<TMarker> {
  //   console.log('formatMarkerData');
  if (!ArrayMarkers) {
    return [];
  }
  return (
    [
      ...ArrayMarkers.map((m: TFullMarker): TMarker => {
        return {
          id: +m.id,
          name: `${m.name}`,
          address: `${m.address}`,
          latitude: parseFloat(m.lat) || 0,
          longitude: parseFloat(m.long) || 0,
          showDetails: false,
        };
      }),
    ].filter(i => !!i) || []
  );
}

const MapScreen: React.FC<TProps> = ({markers, filters, textOfSearch}) => {
  const [selectedMarker, setSelectedMarker] = useState<TMarker>(null);

  const [AllMarkers, setAllMarkers] = useState<Array<TMarker>>(
    formatMarkerData(
      getFilteredPetrolStationList({
        filters,
        stations: markers,
        textOfSearch,
      }),
    ),
  );
  const [region, setRegion] = useState(initRegion);
  const mapRef = useRef();
  const isFocused = useIsFocused();

  const animateToRegion = useCallback(
    (Region: TRegion, speed: number = 300): void => {
      //   console.log('animateToRegion', Region);
      if (!!Region && !!mapRef?.current) {
        // @ts-ignore
        mapRef.current.animateToRegion(Region, speed);
      }
    },
    [mapRef],
  );

  const onRegionChangeComplete = useCallback((props: any) => {
    // console.log('onRegionChangeComplete');
    setRegion({...props});
  }, []);

  const setParams = useCallback(
    (granted: string) => {
      if (granted !== 'granted') {
        return;
      }
      getCurrentPosition(
        (position: TPosition) => {
          //   console.log('setParams', position);
          //   animateToRegion({...region, ...formatLatLong(position)});
          animateToRegion(
            {
              ...initRegion,
              ...formatLatLong(position),
            },
            500,
          );
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    },
    [region],
  );

  const onMapReady = useCallback((): void => {
    // console.log('onMapReady');
    if (ios) {
      request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE || PERMISSIONS.IOS.LOCATION_ALWAYS,
      ).then(granted => {
        // console.log('granted', granted);
        setParams(granted);
      });
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(granted => {
        setParams(granted);
      });
    }
  }, []);

  const onZoomPlus = useCallback(() => {
    animateToRegion({
      ...region,
      longitudeDelta: region.longitudeDelta / K,
      latitudeDelta: region.latitudeDelta / K,
    });
  }, [region]);

  const onZoomMinus = useCallback(() => {
    animateToRegion({
      ...region,
      longitudeDelta: region.longitudeDelta * K,
      latitudeDelta: region.latitudeDelta * K,
    });
  }, [region]);

  const goToNewPosition = useCallback(
    (newPoint: TPoint) => {
      //   console.log(newPoint, 'goToNewPosition');
      const longitude = newPoint.longitude;
      const latitude = newPoint.latitude;
      animateToRegion({
        // ...region,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        longitude,
        latitude,
      });
      //   animateToRegion({
      //     longitude,
      //     latitude,
      //     latitudeDelta: 0.015,
      //     longitudeDelta: 0.02,
      //   });
    },
    [region],
  );

  const openMarker = useCallback(
    (data: TMarker) => {
      if (!data || JSON.stringify(data) === JSON.stringify(selectedMarker)) {
        setSelectedMarker(null);
      } else {
        goToNewPosition(data);
        if (data.showDetails) {
          setSelectedMarker(null);
          navigate('MarkerDetail', {markerId: data.id});
        } else {
          setSelectedMarker(data);
        }
      }
    },
    [selectedMarker],
  );

  const goToUserLocate = useCallback(() => {
    // console.log('goToUserLocate');
    getCurrentPosition(
      position => {
        animateToRegion({...region, ...formatLatLong(position)});
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [region]);

  //   useEffect(() => {
  //     goToUserLocate();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  useEffect(() => {
    setAllMarkers(
      formatMarkerData(
        getFilteredPetrolStationList({
          filters,
          stations: markers,
          textOfSearch,
        }),
      ),
    );
  }, [filters, markers, textOfSearch]);

  const renderCluster = useCallback(cluster => {
    const {id, geometry, onPress, properties} = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}>
        <ClusterMarker counter={points} />
      </Marker>
    );
  }, []);

  //   if (isFocused) {
  //     return null;
  //   }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={[styles.map, styles.mapPadding]}
        // animationEnabled
        //
        clusterColor={colors.green_41BB4E}
        renderCluster={renderCluster}
        //
        cacheEnabled
        followsUserLocation
        initialRegion={initRegion}
        // region={region}
        loadingEnabled
        mapType="standard"
        // maxZoomLevel={18}
        minZoomLevel={5}
        moveOnMarkerPress
        //
        showsCompass
        showsIndoorLevelPicker
        // showsScale
        // showsTraffic
        // TrackViewChanges
        showsUserLocation
        //
        userLocationPriority="balanced"
        userLocationUpdateInterval={10000}
        //
        zoomControlEnabled
        zoomEnabled
        zoomTapEnabled
        //
        onMapReady={onMapReady}
        onRegionChangeComplete={onRegionChangeComplete}>
        {/* {isFocused && */}
        {true &&
          AllMarkers.map(m => (
            <Marker
              key={`${m?.id}`}
              onPress={() => openMarker(m)}
              coordinate={{
                latitude: m?.latitude || 0,
                longitude: m?.longitude || 0,
              }}>
              <MarkerItem selected={selectedMarker?.id === m?.id} />
            </Marker>
          ))}
      </MapView>
      <View style={styles.buttonsBlock}>
        <MapButton onPress={onZoomPlus} />
        <MapButton onPress={onZoomMinus} name="minus" />
        <MapButton onPress={goToUserLocate} green name="location" />
      </View>
      <MarkerModal
        isVisible={!!selectedMarker}
        data={selectedMarker}
        cb={openMarker}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  markers: state.petrolStations,
  filters: state.filters,
  textOfSearch: state.searchStations.textOfSearch,
});

export default connect(mapStateToProps)(MapScreen);
