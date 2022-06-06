import React from 'react';
import {useTranslation, useMemo, useEffect, useCallback} from '@hooks';
import {
  View,
  Modal,
  Text,
  Icon,
  TouchableOpacity,
  ActivityIndicator,
  RadioButtonCustom,
} from '@components';
import styles from './styles';
import {colors, hitSlop} from '@constants';
import {Dispatch} from 'redux';
import {getBrandsCar, getModelsCar, getTankCar} from '@reducers/addCar';
import {connect} from 'react-redux';
import {TAddCar, TGlobalState, TCarModel, TCarProp} from '@types';
import {FlatList} from 'react-native-gesture-handler';

type TProps = {
  dispatch: Dispatch;
  isVisible: boolean;
  closeModal: () => void;
  modalType: 'brand' | 'model' | 'year' | 'tank';
  car: TAddCar;
  setCar: React.Dispatch<React.SetStateAction<TAddCar>>;
  brands: TCarProp[];
  models: TCarModel[];
  tank: TCarProp[];
  loading: boolean;
};

const AddCarModal: React.FC<TProps> = ({
  dispatch,
  isVisible,
  closeModal,
  modalType,
  car,
  setCar,
  brands,
  models,
  tank,
  loading,
}) => {
  const {t} = useTranslation();

  useEffect(() => {
    if (modalType === 'brand' && isVisible) dispatch(getBrandsCar());
    if (modalType === 'model' && isVisible)
      dispatch(getModelsCar(car.brand.id));
    if (modalType === 'tank' && isVisible) dispatch(getTankCar());
  }, [modalType, isVisible, car]);

  const years = useMemo(() => {
    let tempYears = [];
    const selectedModel = models.find(item => item.id === car.model.id);
    const endYear = selectedModel?.year_end
      ? selectedModel.year_end
      : new Date().getFullYear();
    if (selectedModel?.year_start) {
      for (let i = selectedModel.year_start; i <= endYear; i++) {
        tempYears.push(i);
      }
      return tempYears.map(item => {
        return {
          id: item,
          name: String(item),
        };
      });
    } else return [];
  }, [models, car]);

  const modalTypeData = useMemo(() => {
    switch (modalType) {
      case 'brand':
        return {
          title: t('Бренд'),
          state: brands,
          onPress: (item: TCarProp) => () => {
            setCar({
              ...car,
              brand: item,
              model: {id: '', name: ''},
              year: {id: '', name: ''},
              tank: {id: '', name: ''},
            });
            closeModal();
          },
        };
      case 'model':
        return {
          title: t('Модель'),
          state: models,
          onPress: (item: TCarProp) => () => {
            setCar({
              ...car,
              model: item,
              year: {id: '', name: ''},
              tank: {id: '', name: ''},
            });
            closeModal();
          },
        };
      case 'year':
        return {
          title: `${t('Рік')}:`,
          state: years,
          onPress: (item: TCarProp) => () => {
            setCar({
              ...car,
              year: item,
              tank: {id: '', name: ''},
            });
            closeModal();
          },
        };
      case 'tank':
        return {
          title: t('Об’єм баку, л'),
          state: tank,
          onPress: (item: TCarProp) => () => {
            setCar({...car, tank: item});
            closeModal();
          },
        };
    }
  }, [modalType, brands, models, years, tank, car, t]);

  const isRadioActive = useCallback(
    (item: TCarProp) => {
      if (modalType === 'brand') {
        return item.id === car.brand.id;
      }
      if (modalType === 'model') {
        return item.id === car.model.id;
      }
      if (modalType === 'year') {
        return item.id === car.year.id;
      }
      return false;
    },
    [modalType, car],
  );

  const renderItem: ({item}: {item: TCarProp}) => JSX.Element = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={modalTypeData.onPress(item)}>
        <RadioButtonCustom
          text={item.name}
          active={isRadioActive(item)}
          onChange={modalTypeData.onPress(item)}
          type={2}
          containerStyles={{marginBottom: 0}}
        />
      </TouchableOpacity>
    ),
    [modalTypeData, modalType, car],
  );

  const keyExtractor: (item: TCarProp) => string = useCallback(
    item => String(item.id),
    [],
  );

  return (
    <Modal
      isVisible={isVisible}
      backdropTransitionOutTiming={0}
      backdropColor="#000000"
      backdropOpacity={0.5}
      onBackdropPress={closeModal}
      style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{modalTypeData.title}</Text>
          <TouchableOpacity onPress={closeModal} hitSlop={hitSlop}>
            <Icon name="x" size={24} color={colors.black_000000} />
          </TouchableOpacity>
        </View>
        {!loading ? (
          <FlatList
            data={modalTypeData.state}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.flatList}
          />
        ) : (
          <ActivityIndicator size={'large'} color={colors.green_27A74C} />
        )}
      </View>
    </Modal>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  brands: state.addCar.brands,
  models: state.addCar.models,
  tank: state.addCar.tank,
  loading: state.addCar.loading,
});

export default connect(mapStateToProps)(AddCarModal);
