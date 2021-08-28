import React from 'react';
import {useTranslation} from '@hooks';
import {View, Text, Icon, TouchableOpacity, Linking} from '@components';
import {colors} from '@constants';
import styles from './styles';

//Type
import {TRoute} from '@types';
import {getUrlForRoute} from '@helpers';

type TProps = {
  fuelCouner: number | null;
  data: TRoute;
};

export const RouteItem: React.FC<TProps> = ({fuelCouner, data}) => {
  const {t} = useTranslation();
  const {summary, legs} = data;
  const {distance, end_location, start_location} = legs[0];
  const fuelQuantity = fuelCouner
    ? ((fuelCouner * distance.value) / 100000).toFixed(1)
    : 0;

  const openRouteInMap = () => {
    const urlForRoute = getUrlForRoute({
      startLatitude: start_location.lat,
      startLongitude: start_location.lng,
      endLatitude: end_location.lat,
      endLongitude: end_location.lng,
    });
    Linking.openURL(urlForRoute);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <View style={styles.summaryView}>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
        <View style={styles.distanceView}>
          <Text style={styles.distanceText}>{`${
            distance.text
          } / ${fuelQuantity} ${t('l')}`}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.touch} onPress={openRouteInMap}>
        <View style={styles.rightIconView}>
          <View style={styles.iconView}>
            <Icon name="route" color={colors.green_00AE36} size={18} />
          </View>
          <View style={styles.iconTextView}>
            <Text style={styles.iconText}>{`${t('Route')}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
