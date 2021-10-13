import React from 'react';
import {useState, useTranslation} from '@hooks';
import {View} from '@components';
import {
  CalculateButton,
  FuelConsumption,
  ArrivalPoint,
  DeparturePoint,
} from './components';
import {connect} from 'react-redux';
import styles from './styles';
import {getRouteData} from '@helpers';
import type {Dispatch} from 'redux';
import type {TFullGeoPoint, TGeoCoordinates, TGlobalState, TPath} from '@types';
import {
  setArrivalPoint,
  setDeparturePoint,
  setRoutes,
  setFuelConsumption,
} from '@reducers/fuelCalculator';
import {navigate} from '@services';

type TProps = {
  dispatch: Dispatch;
  arrivalPoint: string;
  departurePoint: string;
  fuelConsumption: string;
  navigation: {
    setOptions: Function;
    goBack: Function;
  };
};

const FuelCalculator: React.FC<TProps> = ({
  dispatch,
  arrivalPoint,
  departurePoint,
  fuelConsumption,
}) => {
  const [geoCoordinates, setGeoCoordinates] = useState<TGeoCoordinates>({
    start: null,
    end: null,
  });
  const {t} = useTranslation();

  const getGeoCoordinates = (type: TPath) => (x: TFullGeoPoint) => {
    setGeoCoordinates({...geoCoordinates, [type]: x});
  };

  const onPress = async (bool: boolean | ((prevState: boolean) => boolean)) => {
    if (!!geoCoordinates.end && !!geoCoordinates.start) {
      dispatch(setRoutes(await getRouteData(geoCoordinates)));
      navigate('FuelCalculatorResult');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerUp}>
        <FuelConsumption
          cb={setFuelConsumption}
          fuelConsumption={fuelConsumption}
        />
        <ArrivalPoint
          getGeoCoordinates={getGeoCoordinates}
          textInputValue={arrivalPoint}
          setTextInputValue={setArrivalPoint}
        />
        <DeparturePoint
          getGeoCoordinates={getGeoCoordinates}
          textInputValue={departurePoint}
          setTextInputValue={setDeparturePoint}
        />
      </View>
      <CalculateButton
        onPress={onPress}
        disabled={
          !geoCoordinates?.end || !geoCoordinates?.start || !fuelConsumption
        }
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  arrivalPoint: state.fuelCalculator.arrivalPoint,
  departurePoint: state.fuelCalculator.departurePoint,
  fuelConsumption: state.fuelCalculator.fuelConsumption,
});

export default connect(mapStateToProps)(FuelCalculator);
