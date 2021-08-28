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

export const DeparturePoint: React.FC<TProps> = ({
  getGeoCoordinates,
  geoCoordinates,
  setRoute,
}) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, setRoute && styles.setRoute]}>
      <Autocomplete
        setRoute={setRoute}
        label={t('DeparturePoint')}
        placeholder={
          !geoCoordinates.start?.isCurrentPosition
            ? t('DeparturePoint')
            : t('isCurrentPosition')
        }
        placeholderTextColor={
          geoCoordinates.start?.isCurrentPosition
            ? colors.black_000000
            : colors.gray_8D909D
        }
        showMyPositionButton
        cb={getGeoCoordinates('start')}
      />
    </View>
  );
};
