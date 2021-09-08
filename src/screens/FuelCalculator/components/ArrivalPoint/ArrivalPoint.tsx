/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {useTranslation, useState} from '@hooks';
import {Autocomplete, View, Text} from '@components';
import {colors} from '@constants';
import styles from './styles';

//Type
import {TFullGeoPoint, TGeoCoordinates, TPath} from '@types';

type TProps = {
  getGeoCoordinates: (type: TPath) => (x: TFullGeoPoint) => void;
  geoCoordinates: TGeoCoordinates;
  setRoute: boolean;
};

export const ArrivalPoint: React.FC<TProps> = ({
  getGeoCoordinates,
  geoCoordinates,
  setRoute,
}) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, setRoute && styles.setRoute]}>
      <Autocomplete
        setRoute={setRoute}
        label={t('ArrivalPoint')}
        placeholder={
          !geoCoordinates.end?.isCurrentPosition
            ? t('ArrivalPoint')
            : t('isCurrentPosition')
        }
        placeholderTextColor={
          geoCoordinates.end?.isCurrentPosition
            ? colors.black_000000
            : colors.gray_8D909D
        }
        showMyPositionButton
        cb={getGeoCoordinates('end')}
      />
    </View>
  );
};