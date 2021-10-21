import React from 'react';
import {useCallback, useTranslation, useState, useEffect} from '@hooks';
import {
  View,
  Text,
  Icon,
  TouchableOpacity,
  Modal,
  RadioButtonCustom,
  FlatList,
} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {TProfile, TGlobalState, TFuelProfile, TFuel} from '@types';
import {colors, hitSlop} from '@constants';

type TRadioButtonCBParams = {
  type: number;
  text: string;
};

type TProps = {
  profile: TProfile;
  fuel: TFuel[];
};

const FuelBalance: React.FC<TProps> = ({profile, fuel}) => {
  const {t} = useTranslation();

  const initialFuel: TFuelProfile = {
    id: 2,
    name: '95',
    liters: 0,
  };
  const [fuelType, setFuelType] = useState<TFuelProfile>(initialFuel);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    // find and set the first type of fuel from the profile, the liters of which are not equal to 0, or type "95" if all 0
    if (profile?.fuels?.length) {
      const fuelAvailable = profile.fuels.find(item => item.liters);
      if (fuelAvailable) {
        setFuelType(fuelAvailable);
      }
    }
  }, [profile?.fuels]);

  const openModal = useCallback(() => {
    fuel?.length && setIsModalVisible(true);
  }, [fuel]);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onChangeFuelType = useCallback(
    (params: TRadioButtonCBParams) => {
      const findFuel = fuel.find(item => item.id === params.type);
      if (findFuel) {
        const findFuelInProfile = profile?.fuels.find(
          pf => pf.id === findFuel?.id,
        ) || {...findFuel, liters: 0};
        setFuelType(findFuelInProfile);
      }
      closeModal();
    },
    [profile, fuel],
  );

  const renderItem: ({item}: {item: TFuel}) => JSX.Element = useCallback(
    ({item}) => (
      <RadioButtonCustom
        key={item.id}
        text={item.name}
        active={fuelType.id === item.id}
        onChange={onChangeFuelType}
        type={item.id}
      />
    ),
    [fuelType.id, onChangeFuelType],
  );

  const keyExtractor: (item: TFuel) => string = useCallback(
    item => String(item.id),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.bonusValue}>{`${profile?.count_bonus || 0} ${t(
          'балів',
        )}`}</Text>
      </View>
      <View style={styles.fuelContainer}>
        <TouchableOpacity style={styles.fuelTypeContainer} onPress={openModal}>
          <Text style={styles.fuelTitle}>{t('Вид топлива')}</Text>
          <View style={styles.fuelTypeValueContainer}>
            <Text style={styles.fuelTypeValue}>{`${t(fuelType.name)}`}</Text>
            <Icon name="arrow-down" size={24} color={colors.white_FFFFFF} />
          </View>
        </TouchableOpacity>
        <View style={styles.fuelValueContainer}>
          <Text style={styles.fuelTitle}>{t('Баланс палива')}</Text>
          <Text style={styles.fuelValue}>{`${fuelType.liters} ${t('л')}`}</Text>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        backdropTransitionOutTiming={0}
        backdropColor="#000000"
        backdropOpacity={0.5}
        onBackdropPress={closeModal}
        style={styles.modalContainer}>
        <View style={styles.modalContentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t('Вид топлива')}:</Text>
            <TouchableOpacity onPress={closeModal} hitSlop={hitSlop}>
              <Icon name="x" size={24} color={colors.black_000000} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={fuel}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
  fuel: state.fuel.data,
});

export default connect(mapStateToProps)(FuelBalance);
