import React from 'react';
import {Dispatch} from 'redux';
import {
  useEffect,
  useCallback,
  useMemo,
  useTranslation,
  useState,
  useRoute,
  useNavigation,
} from '@hooks';
import {
  View,
  TouchableOpacity,
  MaterialInput,
  UsualButton,
  Icon,
  ConfirmModal,
} from '@components';
import {TGlobalState, TAddCar, TCar} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '@constants';
import AddCarModal from './components/AddCarModal/AddCarModal';
import {addCar, deleteCar, getModelsCar} from '@reducers/addCar';

type TProps = {
  dispatch: Dispatch;
};

type TModalType = 'brand' | 'model' | 'year' | 'tank';

const AddCar: React.FC<TProps> = ({dispatch}) => {
  const {t} = useTranslation();
  const {params}: any = useRoute();
  const {setOptions} = useNavigation();
  const carToEdit: TCar = params?.car;
  const [car, setCar] = useState<TAddCar>({
    brand: {
      id: carToEdit ? carToEdit.car_brand.id : '',
      name: carToEdit ? carToEdit.car_brand.name : '',
    },
    model: {
      id: carToEdit ? carToEdit.car_model.id : '',
      name: carToEdit ? carToEdit.car_model.name : '',
    },
    year: {
      id: carToEdit ? carToEdit.year : '',
      name: carToEdit ? `${carToEdit.year}` : '',
    },
    tank: {
      id: carToEdit ? carToEdit.car_tank.id : '',
      name: carToEdit ? `${carToEdit.car_tank.tank}` : '',
    },
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [modalType, setModalType] = useState<TModalType>('brand');

  useEffect(() => {
    if (carToEdit) dispatch(getModelsCar(car.brand.id));
  }, []);

  useEffect(() => {
    setOptions({
      headerRight: carToEdit
        ? () => (
            <TouchableOpacity onPress={onPressDeleteCar}>
              <Icon size={24} name="trash" color={colors.white_FFFFFF} />
            </TouchableOpacity>
          )
        : null,
    });
  }, [carToEdit]);

  const isFieldsPristine = useMemo(() => {
    return (
      carToEdit &&
      car.brand.name === carToEdit.car_brand.name &&
      car.model.name === carToEdit.car_model.name &&
      car.tank.name === String(carToEdit.car_tank.tank) &&
      car.year.name === String(carToEdit.year)
    );
  }, [car, carToEdit]);

  const onChangeTank = useCallback(
    val => {
      if (val.startsWith('0')) return;
      const formattedValue = val ? val.replace(/[^0-9.]/g, '') : val;
      setCar({...car, tank: {id: '', name: formattedValue}});
    },
    [car],
  );

  const tankMaxLength = useMemo(() => {
    return car.tank.name.includes('.') ? 4 : 3;
  }, [car.tank.name]);

  const openDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(false);
  }, []);

  const onPressDeleteCar = useCallback(() => {
    openDeleteModal();
  }, []);

  const onPressConfirmDeleteCar = useCallback(() => {
    dispatch(deleteCar(carToEdit.id));
    closeDeleteModal();
  }, []);

  const openModal = useCallback(
    (type: TModalType) => () => {
      setModalType(type);
      setIsModalVisible(true);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onPressSaveCar = useCallback(() => {
    carToEdit
      ? dispatch(addCar({...car, carToEditId: carToEdit.id}))
      : dispatch(addCar({...car}));
  }, [car]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.buttonTI}
          onPress={openModal('brand')}
        />
        <MaterialInput
          renderRightAccessory
          rightAccessoryName={'arrow-down'}
          rightAccessoryColor={colors.gray_8D909D}
          value={car.brand.name}
          label={t('Бренд')}
          disabled
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonTI}
          onPress={openModal('model')}
          disabled={!car.brand.name}
        />
        <MaterialInput
          renderRightAccessory
          rightAccessoryName={'arrow-down'}
          rightAccessoryColor={colors.gray_8D909D}
          value={car.model.name}
          label={t('Модель')}
          disabled
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonTI}
          onPress={openModal('year')}
          disabled={!car.model.name}
        />
        <MaterialInput
          renderRightAccessory
          rightAccessoryName={'arrow-down'}
          rightAccessoryColor={colors.gray_8D909D}
          value={car.year.name}
          label={t('Рік')}
          disabled
        />
      </View>
      <View>
        {/* <TouchableOpacity
          style={styles.buttonTI}
          onPress={openModal('tank')}
          disabled={!car.year.name}
        /> */}
        <MaterialInput
          keyboardType="decimal-pad"
          rightAccessoryColor={colors.gray_8D909D}
          value={car.tank.name}
          onChangeText={onChangeTank}
          label={t('Об’єм баку, л')}
          maxLength={tankMaxLength}
          lineWidth={0.5}
        />
      </View>
      {car.brand.name && car.model.name && car.year.name && car.tank.name ? (
        <View style={styles.buttonContainer}>
          <UsualButton
            title={t('Зберегти')}
            onPress={onPressSaveCar}
            disabled={carToEdit && isFieldsPristine}
          />
        </View>
      ) : null}
      <AddCarModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        modalType={modalType}
        car={car}
        setCar={setCar}
      />
      <ConfirmModal
        isVisible={isDeleteModalVisible}
        closeModal={closeDeleteModal}
        title={t('Впевнені, що хочете видалити авто?')}
        leftButtonText={t('Ні, не хочу')}
        rightButtonText={t('Так, видалити')}
        rightButtonOnPress={onPressConfirmDeleteCar}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(AddCar);
