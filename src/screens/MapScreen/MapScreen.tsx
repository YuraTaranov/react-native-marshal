/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {useEffect, useState, useRef} from '@hooks';
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
import {getFilteredPetrolStationList} from '@helpers';
import styles from './styles';

// Types
import {TGlobalState, TPetrolStation, TFullMarker, TFilters} from '@types';
import {Dispatch} from 'redux';

const {getCurrentPosition} = Geolocation;

const initRegion = {
  latitude: 49.9882292,
  longitude: 36.2258057,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
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
};
type Tcoords = {
  longitude: number;
  latitude: number;
};
type TPosition = {
  coords: Tcoords;
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

function formatLatLong(position: TPosition): Tcoords | object {
  if (!position?.coords) {
    return {};
  }
  const {latitude, longitude} = position.coords;
  return {latitude, longitude};
}

function formatMarkerData(ArrayMarkers: Array<TFullMarker>): Array<TMarker> {
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

const MapScreen: React.FC<TProps> = ({markers, filters}) => {
  const [selectedMarker, setSelectedMarker] = useState<TMarker>(null);
  const [AllMarkers, setAllMarkers] = useState<Array<TMarker>>(
    formatMarkerData(markers),
  );
  const [region, setRegion] = useState(initRegion);
  const mapRef = useRef();

  useEffect(() => {
    setAllMarkers(formatMarkerData(markers));
  }, [markers]);

  const animateToRegion = (Region: TRegion): void => {
    if (!!Region && !!mapRef?.current) {
      // @ts-ignore
      mapRef.current.animateToRegion(Region, 300);
    }
  };

  function onRegionChangeComplete(props: any) {
    setRegion({...props});
  }

  function setParams(granted: string) {
    if (granted !== 'granted') {
      return;
    }
    getCurrentPosition(
      (position: TPosition) => {
        animateToRegion({...region, ...formatLatLong(position)});
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  const onMapReady = (): void => {
    if (ios) {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(granted => {
        setParams(granted);
      });
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(granted => {
        setParams(granted);
      });
    }
  };

  const onZoomPlus = () => {
    animateToRegion({
      ...region,
      longitudeDelta: region.longitudeDelta / K,
      latitudeDelta: region.latitudeDelta / K,
    });
  };

  const onZoomMinus = () => {
    animateToRegion({
      ...region,
      longitudeDelta: region.longitudeDelta * K,
      latitudeDelta: region.latitudeDelta * K,
    });
  };

  const goToNewPosition = (newPoint: TPoint) => {
    const longitude = newPoint.longitude;
    const latitude = newPoint.latitude;
    animateToRegion({...region, longitude, latitude});
  };

  const openMarker = (data: TMarker) => {
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
  };

  const goToUserLocate = () => {
    getCurrentPosition(
      position => {
        animateToRegion({...region, ...formatLatLong(position)});
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    goToUserLocate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAllMarkers(
      formatMarkerData(
        getFilteredPetrolStationList({
          stations: markers,
          filters,
        }),
      ),
    );
  }, [filters, markers]);

  if (!useIsFocused()) {
    return null;
  }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={[styles.map, styles.mapPadding]}
        animationEnabled
        //
        clusterColor={colors.green_41BB4E}
        renderCluster={cluster => {
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
        }}
        //
        cacheEnabled
        followsUserLocation
        initialRegion={initRegion}
        region={{...region}}
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
        {AllMarkers.map(m => (
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
});

export default connect(mapStateToProps)(MapScreen);
