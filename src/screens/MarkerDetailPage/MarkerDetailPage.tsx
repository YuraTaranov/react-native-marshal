/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {
  useEffect,
  useCallback,
  useTranslation,
  useState,
  useNavigation,
  useRoute,
} from '@hooks';

import {View, Text, ScrollView, Geolocation, Linking} from '@components';
import {GetRouteButton} from './components';
import {ios} from '@constants';
import {getUrlForRoute} from '@helpers';
import {SVG_Icons} from '@assets';

import {connect} from 'react-redux';
import styles from './styles';

//Type
import {TFuel, TGlobalState, TPetrolStation} from '@types';
import {colors} from '@constants';
// import {Dispatch} from 'redux';
type TRoute = {
  params?: {
    markerId?: number | undefined;
    isGPS: boolean;
  };
};

type TProps = {
  // dispatch: Dispatch;
  petrolStations: Array<TPetrolStation>;
  route: TRoute;
  fuel: TFuel[];
};
//markerId

const MarkerDetailPage: React.FC<TProps> = ({
  // dispatch,
  // route,
  petrolStations,
  fuel,
}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  const {params} = useRoute();
  const [showRouteButton, setShowRouteButton] = useState(false);
  const [stationId, setStationId] = useState<number | undefined>(undefined);
  // const [stationId, setStationId] = useState<number | null>(
  //   route?.params?.markerId || null,
  // );
  const [stationDetails, setStationDetail] = useState<TPetrolStation | null>();

  const findFuelPrice = useCallback(
    id => {
      const find = fuel.find(f => f.id === id);
      return find ? find.price : 0;
    },
    [fuel],
  );

  const setHeader = useCallback(() => {
    if (stationDetails && stationDetails?.name) {
      setOptions({
        title: stationDetails.name,
        headerTitleStyle: {
          marginLeft: ios ? 0 : 15,
        },
      });
    }
  }, [setOptions, stationDetails]);

  useEffect(() => {
    setStationDetail(petrolStations.filter(i => i.id === stationId)[0] || null);
    setHeader();
  }, [stationId, petrolStations, setHeader]);

  useEffect(() => {
    if (params?.markerId) {
      setStationId(params.markerId);
    }
    if (params?.isGPS) {
      setShowRouteButton(true);
    } else {
      setShowRouteButton(false);
    }
  }, [params]);

  const openingRoute = () => {
    Geolocation.getCurrentPosition(
      position => {
        const urlForRoute = getUrlForRoute({
          startLatitude: position?.coords?.latitude || 0,
          startLongitude: position?.coords?.longitude || 0,
          endLatitude: stationDetails?.lat || 0,
          endLongitude: stationDetails?.long || 0,
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
        <View style={styles.iconView}>
          <SVG_Icons height={22} fill={colors.green_41BB4E} name="point" />
        </View>
        <View style={styles.addressTextView}>
          <Text style={styles.addressText}>{`${stationDetails.address}`}</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Fuel')}</Text>
        </View>
        {stationDetails.fuels.map(item => (
          <View key={`__${item?.id}__`} style={styles.itemView}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>{`${item.name}`}</Text>
            </View>
            <View style={styles.rightView}>
              <Text style={styles.rightText}>{`${
                findFuelPrice(item.id) || ''
              } ₴ / л`}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonView}>
        {showRouteButton && (
          <GetRouteButton
            iconName="route"
            label={t('Get directions')}
            onPress={openingRoute}
            black
          />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  petrolStations: state.petrolStations,
  fuel: state.fuel.data,
});

export default connect(mapStateToProps)(MarkerDetailPage);
