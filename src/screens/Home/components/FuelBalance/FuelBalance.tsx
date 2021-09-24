import React from 'react';
import {useCallback, useTranslation, useState, useEffect} from '@hooks';
import {
  View,
  Text,
  Icon,
  TouchableOpacity,
  Modal,
  RadioButtonCustom,
} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {TProfile, TGlobalState, TFuelProfile} from '@types';
import {colors, hitSlop} from '@constants';

type TRadioButtonCBParams = {
  type: number;
  text: string;
};

type TProps = {
  profile: TProfile;
};

const FuelBalance: React.FC<TProps> = ({profile}) => {
  const {t} = useTranslation();
  const initialFuel: TFuelProfile = {
    id: 1,
    name: t('ДП'),
    liters: 0,
  };
  const [fuelType, setFuelType] = useState<TFuelProfile>(initialFuel);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const fuelLength = profile?.fuels?.length;

  useEffect(() => {
    // find and set the first type of fuel from the profile, the liters of which are not equal to 0, or type "95" if all 0
    if (fuelLength) {
      const fuelAvailable = profile.fuels.find(item => item.liters);
      if (fuelAvailable) {
        setFuelType(fuelAvailable);
      } else {
        setFuelType(profile.fuels[1]);
      }
    }
  }, [fuelLength]);

  const openModal = useCallback(() => {
    fuelLength && setIsModalVisible(true);
  }, [fuelLength]);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onChangeFuelType = useCallback(
    (params: TRadioButtonCBParams) => {
      const findFuelType = profile.fuels.find(item => item.id === params.type);
      findFuelType && setFuelType(findFuelType);
      closeModal();
    },
    [fuelLength],
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
            <Text style={styles.fuelTypeValue}>{`${fuelType.name}`}</Text>
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
          <RadioButtonCustom
            text={'95'}
            active={fuelType.id === 2}
            onChange={onChangeFuelType}
            type={2}
          />
          <RadioButtonCustom
            text={'98'}
            active={fuelType.id === 3}
            onChange={onChangeFuelType}
            type={3}
          />
          <RadioButtonCustom
            text={'98+'}
            active={fuelType.id === 4}
            onChange={onChangeFuelType}
            type={4}
          />
          <RadioButtonCustom
            text={t('ДП')}
            active={fuelType.id === 1}
            onChange={onChangeFuelType}
            type={1}
          />
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
});

export default connect(mapStateToProps)(FuelBalance);
