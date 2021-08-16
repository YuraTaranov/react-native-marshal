import React from 'react';
import {Dispatch} from 'redux';
import {useEffect, useCallback, useTranslation, useState} from '@hooks';
import {View, Text, ScrollView, Geolocation, Linking} from '@components';
import {GetRouteButton} from './components';
import {getUrlForRoute} from '@helpers';

import {connect} from 'react-redux';
import styles from './styles';

//Type
import {TGlobalState, TPetrolStation} from '@types';
type TRoute = {
  params?: {
    markerId?: number;
  };
};

type TProps = {
  dispatch: Dispatch;
  petrolStations: Array<TPetrolStation>;
  route: TRoute;
  navigation: {
    setOptions: Function;
  };
};
//markerId

const MarkerDetailPage: React.FC<TProps> = ({
  dispatch,
  route,
  navigation,
  petrolStations,
}) => {
  const {t} = useTranslation();

  const [stationId, setStationId] = useState<number | null>(
    route?.params?.markerId || null,
  );
  const [stationDetails, setStationDetail] = useState<TPetrolStation | null>();

  const setHeadear = useCallback(() => {
    if (stationDetails && stationDetails?.name) {
      navigation.setOptions({title: stationDetails.name});
    }
  }, [navigation, stationDetails]);

  useEffect(() => {
    setStationDetail(petrolStations.filter(i => i.id === stationId)[0] || null);
    setHeadear();
  }, [stationId, petrolStations, setHeadear]);

  const openingRoute = () => {
    Geolocation.getCurrentPosition(
      position => {
        const urlForRoute = getUrlForRoute({
          startLatitude: position?.coords?.latitude || 0,
          startLongitude: position?.coords?.longitude || 0,
          endLatitude: stationDetails?.lat,
          endLongitude: stationDetails?.long,
        });
        Linking.openURL(urlForRoute);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  if (!stationDetails) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.addressView}>
        <Text style={styles.addressText}>{stationDetails.address}</Text>
      </View>
      <ScrollView>
        {stationDetails.fuels.map(item => (
          <View key={`__${item?.id}__`}>
            <Text>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonView}>
        <GetRouteButton
          iconName="route"
          label={t('Route')}
          onPress={openingRoute}
          black
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  petrolStations: state.petrolStations,
});

export default connect(mapStateToProps)(MarkerDetailPage);
