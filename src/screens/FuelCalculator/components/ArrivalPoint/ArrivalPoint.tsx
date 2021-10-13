/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {useTranslation} from '@hooks';
import {Autocomplete, View} from '@components';
import {colors} from '@constants';
import styles from './styles';
import {TFullGeoPoint, TPath} from '@types';

type TProps = {
  getGeoCoordinates: (type: TPath) => (x: TFullGeoPoint) => void;
  textInputValue: string;
  setTextInputValue: (data: any) => {
    data: any;
    type: string;
  };
};

export const ArrivalPoint: React.FC<TProps> = ({
  getGeoCoordinates,
  textInputValue,
  setTextInputValue,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Autocomplete
        label={t('ArrivalPoint')}
        textInputValue={textInputValue}
        setTextInputValue={setTextInputValue}
        placeholder={t('ArrivalPoint')}
        placeholderTextColor={colors.gray_8D909D}
        showMyPositionButton={false}
        type="arrival"
        cb={getGeoCoordinates('end')}
      />
    </View>
  );
};
