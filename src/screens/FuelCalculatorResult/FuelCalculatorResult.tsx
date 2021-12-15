import React from 'react';
import {Dispatch} from 'redux';
import {useCallback, useTranslation} from '@hooks';
import {View, Text, ScrollView, Icon, UsualButton} from '@components';
import {TGlobalState, TRoute} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {RouteItem} from '../FuelCalculator/components/RouteItem/RouteItem';
import {colors} from '@constants';
import {navigate} from '@services';

const dots = [1, 2, 3];

type TProps = {
  dispatch: Dispatch;
  arrivalPoint: string;
  departurePoint: string;
  fuelConsumption: string;
  routes: TRoute[];
};

const FuelCalculatorResult: React.FC<TProps> = ({
  arrivalPoint,
  departurePoint,
  routes,
  fuelConsumption,
}) => {
  const {t} = useTranslation();

  const fuelCountToBuy = fuelConsumption
    ? (
        (+fuelConsumption * +routes[0]?.legs[0]?.distance?.value) /
        100000
      ).toFixed(2)
    : 0;

  const onPressBuyFuel = useCallback(() => {
    navigate('HomeStack', {
      screen: 'FuelPurchase',
      params: {fuelCountToBuy},
    });
  }, [fuelCountToBuy]);

  return (
    <View style={styles.container}>
      <View style={styles.pointContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle} />
        </View>
        <Text style={styles.pointText}>{departurePoint}</Text>
      </View>
      <View style={styles.dotsContainer}>
        {dots.map((item, index) => (
          <View style={styles.dot} key={index} />
        ))}
      </View>
      <View style={styles.pointContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle} />
        </View>
        <Text style={styles.pointText}>{arrivalPoint}</Text>
      </View>
      <View style={styles.fuelContainer}>
        <Icon size={24} color={colors.green_00AE36} name="gas" />
        <Text style={styles.fuelText}>{`${fuelConsumption} ${t(
          'l/100km',
        )}`}</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {routes.map(r => (
          <RouteItem key={r.summary} fuelCouner={+fuelConsumption} data={r} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <UsualButton title={t('BuyFuel')} onPress={onPressBuyFuel} />
      </View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  arrivalPoint: state.fuelCalculator.arrivalPoint,
  departurePoint: state.fuelCalculator.departurePoint,
  routes: state.fuelCalculator.routes,
  fuelConsumption: state.fuelCalculator.fuelConsumption,
});

export default connect(mapStateToProps)(FuelCalculatorResult);
