import React from 'react';
import {Dispatch} from 'redux';
import {
  useEffect,
  useCallback,
  useMemo,
  useTranslation,
  useState,
} from '@hooks';
import {View, Text, TouchableOpacity, MaterialInput} from '@components';
import {TGlobalState, TCar} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '@constants';

type TProps = {
  dispatch: Dispatch;
};

// TODO:
const AddCar: React.FC<TProps> = ({dispatch}) => {
  const {t} = useTranslation();
  const [car, setCar] = useState<TCar>({
    brand: '',
    model: '',
    year: '',
    tank: '',
  });

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.buttonTI}
          //   onPress={openModal('date')}
        />
        <MaterialInput
          renderRightAccessory
          rightAccessoryName={'arrow-down'}
          rightAccessoryColor={colors.gray_8D909D}
          value={car.brand}
          label={t('Бренд')}
          disabled={true}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonTI}
          //   onPress={openModal('date')}
        />
        <MaterialInput
          renderRightAccessory
          rightAccessoryName={'arrow-down'}
          rightAccessoryColor={colors.gray_8D909D}
          value={car.model}
          label={t('Модель')}
          disabled={true}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonTI}
          //   onPress={openModal('date')}
        />
        <MaterialInput
          renderRightAccessory
          rightAccessoryName={'arrow-down'}
          rightAccessoryColor={colors.gray_8D909D}
          value={car.year}
          label={t('Рік')}
          disabled={true}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonTI}
          //   onPress={openModal('date')}
        />
        <MaterialInput
          renderRightAccessory
          rightAccessoryName={'arrow-down'}
          rightAccessoryColor={colors.gray_8D909D}
          value={car.tank}
          label={t('Об’єм баку, л')}
          disabled={true}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  // reducer: state.reducer
});

export default connect(mapStateToProps)(AddCar);
