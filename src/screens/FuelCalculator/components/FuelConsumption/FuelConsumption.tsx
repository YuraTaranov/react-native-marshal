import React from 'react';
import {
  useTranslation,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from '@hooks';
import styles from './styles';
import {MaterialInput, Text, View} from '@components';
import {colors} from '@constants';
import {setFuelConsumption} from '@reducers/fuelCalculator';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

type TProps = {
  cb: (n: number | null) => void;
  counter?: number | undefined | null | string;
  fuelConsumption: string;
  dispatch: Dispatch;
};

const FuelConsumption: React.FC<TProps> = ({dispatch, cb, fuelConsumption}) => {
  const {t} = useTranslation();
  const REF = useRef();
  const [showClearIcon, setShowClearIcon] = useState(false);
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
      dispatch(setFuelConsumption(''));
      setRefresh(new Date().toString());
      cb(0);
    }
  };
  useEffect(() => {
    let num = '';
    if (typeof fuelConsumption === 'string') {
      num = fuelConsumption.toString();
    }
    dispatch(
      cb(
        //@ts-ignore
        num
          .replace(/^\D/, '0.')
          .replace(/[\D]+/g, '.')
          .replace(/^0([^\.])+/, '0.$1')
          .replace(/^(.{3})(\.)$/g, '$10'),
      ),
    );
  }, [cb, fuelConsumption]);

  const maxLength = useMemo(() => {
    return fuelConsumption.includes('.') ? 4 : 3;
  }, [fuelConsumption]);

  const onChangeText = useCallback(value => {
    dispatch(setFuelConsumption(value));
  }, []);

  return (
    <View style={styles.container}>
      <>
        <MaterialInput
          key={refresh}
          //@ts-ignore
          onRef={REF}
          activeLineWidth={1}
          inputContainerStyle={{...styles.inputContainer}}
          keyboardType={'decimal-pad'}
          label={t('FuelConsumption')}
          lineWidth={1}
          maxLength={maxLength}
          onChangeText={onChangeText}
          onPressAccessory={onClear}
          renderRightAccessory={showClearIcon}
          returnKeyType={'done'}
          rightAccessoryName={'x'}
          rightClear
          tintColor={colors.gray_6D6F79}
          value={fuelConsumption}
        />
        <View style={styles.fuelConsumptionView}>
          <Text style={styles.fuelConsumptionText}>{t('l/100km')}</Text>
        </View>
      </>
    </View>
  );
};

export default connect()(FuelConsumption);
