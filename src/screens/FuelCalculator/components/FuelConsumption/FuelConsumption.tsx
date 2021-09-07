import React from 'react';

import {useTranslation, useState, useRef, useEffect} from '@hooks';
import styles, {withRoute} from './styles';
import {MaterialInput, Text, View} from '@components';
import {colors} from '@constants';
import {SVG_Icons} from '@assets';
import {animation} from '@helpers';

//Type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {Dispatch, SetStateAction} from 'react';
type TProps = {
  cb: (n: number | null) => void;
  setRoute: boolean;
};
type TLabeProps = {
  title: string;
};

const Label: React.FC<TLabeProps> = ({title}) => {
  const {t} = useTranslation();
  animation();
  return (
    <View style={withRoute.label}>
      <View style={withRoute.leftIconView}>
        <SVG_Icons height={25} fill={colors.green_00AE36} name="gas" />
      </View>
      <Text style={withRoute.labelText}>{`${title} ${t('l/100km')}`}</Text>
    </View>
  );
};

export const FuelConsumption: React.FC<TProps> = ({setRoute, cb}) => {
  const {t} = useTranslation();
  const REF = useRef();
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [fuelConsumption, setFuelConsumption] = useState('');
  const [refresh, setRefresh] = useState(new Date().toString());

  useEffect(() => {
    //@ts-ignore
    if (!!REF && REF?.current?.inputRef?.current?.clear && fuelConsumption) {
      setShowClearIcon(true);
    } else {
      setShowClearIcon(false);
    }
  }, [REF, fuelConsumption]);

  const onClear = () => {
    if (showClearIcon) {
      //@ts-ignore
      REF?.current?.inputRef?.current?.clear();
      setFuelConsumption('');
      setRefresh(new Date().toString());
    }
  };
  useEffect(() => {
    cb(+parseFloat(fuelConsumption).toFixed(1) || 0);
  }, [cb, fuelConsumption]);

  return (
    <View style={setRoute ? withRoute.container : styles.container}>
      {setRoute ? (
        <Label title={fuelConsumption} />
      ) : (
        <>
          <MaterialInput
            key={refresh}
            //@ts-ignore
            onRef={REF}
            rightClear
            renderRightAccessory={showClearIcon}
            rightAccessoryName={'x'}
            returnKeyType={'done'}
            onPressAccessory={onClear}
            onChangeText={setFuelConsumption}
            tintColor={colors.gray_6D6F79}
            lineWidth={setRoute ? 0 : 1}
            activeLineWidth={1}
            label={t('FuelConsumption')}
            keyboardType={'number-pad'}
            maxLength={4}
            inputContainerStyle={{...styles.inputContainer}}
          />
          <View style={styles.fuelConsumptionView}>
            <Text style={styles.fuelConsumptionText}>{t('l/100km')}</Text>
          </View>
        </>
      )}
    </View>
  );
};
