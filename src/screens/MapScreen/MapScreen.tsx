/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback} from 'react';
import {useEffect, useState, useRef, useMemo} from '@hooks';
import {
  Geolocation,
  MapView,
  Marker as MapMarker,
  PERMISSIONS,
  PROVIDER_GOOGLE,
  PermissionsAndroid,
  View,
  request,
  Alert,
} from '@components';
import {MapButton, MarkerModal, ClusterMarker, MarkerItem} from './components';
import {connect} from 'react-redux';
import {colors, ios} from '@constants';
import {navigate} from '@services';
import {useIsFocused} from '@react-navigation/core';
import {
  getFilteredPetrolStationList,
  isSearch,
  openAppSettings,
} from '@helpers';
import {setGPS} from '@reducers/appGlobalState';
import styles from './styles';

// Types
import {TGlobalState, TPetrolStation, TFullMarker, TFilters} from '@types';
import {Dispatch} from 'redux';
import CustomMarker from './components/CustomMarker/CustomMarker';

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
  dispatch: Dispatch;
  markers: Array<TPetrolStation>;
  filters: TFilters;
  textOfSearch: string;
  isGPS: boolean;
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
  image: string;
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
  if (!ArrayMarkers) {
    return [];
  }
  return (
    [
      ...ArrayMarkers.map((m: TFullMarker, index: number): TMarker => {
        return {
          id: +m.id,
          name: `${m.name}`,
          address: `${m.address}`,
          latitude: parseFloat(m.lat) || 0,
          longitude: parseFloat(m.long) || 0,
          showDetails: false,
          image: m.image,
        };
      }),
    ].filter(i => !!i) || []
  );
}

const MapScreen: React.FC<TProps> = ({
  dispatch,
  filters,
  isGPS,
  markers,
  textOfSearch,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<TMarker>(null);
  const [disabledZoomMinus, setDisabledZoomMinus] = useState<boolean>(true);
  const [disabledZoomPlus, setDisabledZoomPlus] = useState<boolean>(true);
  const [markerModalVisible, setMarkerModalVisible] = useState<boolean>(false);

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
  const [refresh, setRefresh] = useState(new Date().getTime().toString());

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
        dispatch(setGPS(false));
        return;
      }
      getCurrentPosition(
        (position: TPosition) => {
          dispatch(setGPS(true));
          animateToRegion(
            {
              ...initRegion,
              ...formatLatLong(position),
            },
            500,
          );
          setTimeout(() => {
            setDisabledZoomMinus(false);
            setDisabledZoomPlus(false);
          }, 1000);
        },
        error => {
          dispatch(setGPS(false));
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    },
    [animateToRegion, dispatch],
  );

  const onMapReady = useCallback((): void => {
    setDisabledZoomMinus(true);
    setDisabledZoomPlus(true);

    if (ios) {
      request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE || PERMISSIONS.IOS.LOCATION_ALWAYS,
      ).then(granted => {
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
  }, [animateToRegion, region]);

  const onZoomMinus = useCallback(() => {
    if (!disabledZoomMinus) {
      animateToRegion({
        ...region,
        longitudeDelta: region.longitudeDelta * K,
        latitudeDelta: region.latitudeDelta * K,
      });
    }
  }, [disabledZoomMinus, animateToRegion, region]);

  const goToNewPosition = useCallback(
    (newPoint: TPoint) => {
      const longitude = newPoint.longitude;
      const latitude = newPoint.latitude;
      animateToRegion({
        // ...region,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        longitude,
        latitude,
      });
    },
    [animateToRegion],
  );

  useEffect(() => {
    if (region.longitudeDelta > 15.82) {
      setDisabledZoomMinus(true);
    } else {
      setDisabledZoomMinus(false);
    }

    if (region.longitudeDelta > 0.000262) {
      setDisabledZoomPlus(false);
    } else {
      setDisabledZoomPlus(true);
    }
  }, [disabledZoomMinus, disabledZoomPlus, region]);

  const openMarker = useCallback(
    (data: TMarker) => () => {
      setMarkerModalVisible(true);
      setSelectedMarker(data);
      data && goToNewPosition(data);
    },
    [],
  );

  const goToUserLocate = useCallback(() => {
    getCurrentPosition(
      position => {
        dispatch(setGPS(true));
        animateToRegion({...region, ...formatLatLong(position)});
      },
      error => {
        dispatch(setGPS(false));
        openAppSettings();
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
    if (!ios && isFocused) {
      setRefresh(new Date().getTime().toString());
    }
  }, [isFocused]);

  useEffect(() => {
    setAllMarkers([
      ...formatMarkerData(
        getFilteredPetrolStationList({
          filters,
          stations: markers,
          textOfSearch,
        }),
      ),
    ]);
  }, [filters, markers, textOfSearch]);

  const renderCluster = useCallback(cluster => {
    const {id, geometry, onPress, properties} = cluster;
    const points = properties.point_count;

    return (
      <MapMarker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        tracksViewChanges={false}
        onPress={onPress}>
        <ClusterMarker counter={points} />
      </MapMarker>
    );
  }, []);

  const renderMarkers = useMemo(() => {
    return AllMarkers.map((m, index) => (
      <CustomMarker
        key={m?.id || index}
        m={m}
        selectedMarker={selectedMarker}
        openMarker={openMarker}
        coordinate={{
          // need for clustering
          latitude: m?.latitude || 0,
          longitude: m?.longitude || 0,
        }}
      />
    ));
  }, [selectedMarker, openMarker, AllMarkers]);

  return (
    <View style={styles.container}>
      <MapView
        key={refresh}
        // @ts-ignore
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={[styles.map]}
        extent={ios ? 512 : 150}
        nodeSize={ios ? 64 : 200}
        // animationEnabled
        //
        clusterColor={colors.green_41BB4E}
        renderCluster={renderCluster}
        //
        cacheEnabled
        followsUserLocation
        initialRegion={initRegion}
        loadingEnabled
        mapType="standard"
        minZoomLevel={5}
        moveOnMarkerPress
        //
        showsCompass
        showsIndoorLevelPicker
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
        {isFocused && renderMarkers}
      </MapView>
      <View style={styles.buttonsBlock}>
        <MapButton onPress={goToUserLocate} green name="location-1" />
      </View>
      <MarkerModal
        isVisible={markerModalVisible}
        setVisible={setMarkerModalVisible}
        data={selectedMarker}
        cb={openMarker}
        isGPS={isGPS}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  markers: state.petrolStations.data,
  filters: state.filters,
  textOfSearch: state.searchStations.textOfSearch,
  isGPS: state.appGlobalState.gps,
});

export default connect(mapStateToProps)(MapScreen);
