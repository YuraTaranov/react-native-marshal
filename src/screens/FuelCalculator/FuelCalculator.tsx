/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {useEffect, useState} from '@hooks';
import {View, Text, Platform, ScrollView} from '@components';
import {
  CalculateButton,
  FuelConsumption,
  ArrivalPoint,
  DeparturePoint,
  RouteItem,
} from './components';

import {animation} from '@helpers';
import {connect} from 'react-redux';
import {getLang} from '@reducers/appGlobalState';
import styles from './styles';

import {getRouteData, getDistanceMatrix, getUrlForRoute} from '@helpers';

//Type
import type {Dispatch} from 'redux';
import type {
  TFullGeoPoint,
  TGeoCoordinates,
  TGlobalState,
  TPath,
  TRoute,
} from '@types';
import type {TPlatformName} from 'src/helpers/animation';

type TProps = {
  dispatch: Dispatch;
  lang: string;
};

const GreenLine = () => {
  animation(Platform.OS as TPlatformName);
  return (
    <View style={styles.line}>
      {[1, 2].map((key: number) => (
        <View style={styles.circle} key={`_${key}_`} />
      ))}
    </View>
  );
};

const FuelCalculator: React.FC<TProps> = ({dispatch, lang}) => {
  const [geoCoordinates, setGeoCoordinates] = useState<TGeoCoordinates>({
    start: null,
    end: null,
  });
  const [routes, writeDownTheRoutes] = useState<Array<TRoute>>([]);
  const [isBuy, setStatusPage] = useState(false);
  const [fuelConsumptionCouner, setFuelConsumptionCouner] = useState<
    number | null
  >(null);

  const getGeoCoordinates = (type: TPath) => (x: TFullGeoPoint) => {
    setGeoCoordinates({...geoCoordinates, [type]: x});
  };

  const onPress = async (bool: boolean | ((prevState: boolean) => boolean)) => {
    setStatusPage(bool);
    if (!!geoCoordinates.end && !!geoCoordinates.start) {
      //@ts-ignore
      writeDownTheRoutes(await getRouteData(geoCoordinates));
    }
  };

  useEffect(() => {
    // console.log('geoCoordinates:\n', geoCoordinates);
    // console.log('routes:\n', routes);
    // console.log('isBay:\n', isBuy);
  }, [geoCoordinates, isBuy, routes]);

  return (
    <View style={styles.container}>
      <View style={styles.containerUp}>
        <FuelConsumption cb={setFuelConsumptionCouner} setRoute={isBuy} />
        <ArrivalPoint
          getGeoCoordinates={getGeoCoordinates}
          geoCoordinates={geoCoordinates}
          setRoute={isBuy}
        />
        <DeparturePoint
          getGeoCoordinates={getGeoCoordinates}
          geoCoordinates={geoCoordinates}
          setRoute={isBuy}
        />
        {isBuy && <GreenLine />}
      </View>

      <ScrollView style={styles.scrollView}>
        {routes.map(r => (
          <RouteItem
            key={r.summary}
            fuelCouner={fuelConsumptionCouner}
            data={r}
          />
        ))}
      </ScrollView>

      <CalculateButton
        onPress={onPress}
        isBuy={isBuy}
        disabled={!geoCoordinates?.end || !geoCoordinates?.start}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  lang: getLang(state.appGlobalState.lang),
});

export default connect(mapStateToProps)(FuelCalculator);
