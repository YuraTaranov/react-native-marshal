import React from 'react';
import {useState, useEffect, useTranslation} from '@hooks';
import {Modal, DeviceInfo, ActivityIndicator, Alert} from '@components';
import styles from './styles';
import ReactNativeBiometrics from 'react-native-biometrics';
import {connect} from 'react-redux';
import {colors} from '@constants';
import {loginWithBiometrics} from '@reducers/login';

const BiometricsLoginModal: React.FC<TProps> = ({dispatch}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const biometrics = async () => {
    const biometricKeysExist = await ReactNativeBiometrics.biometricKeysExist();
    const device_id = await DeviceInfo.getUniqueId();
    if (biometricKeysExist.keysExist) {
      setModalVisible(true);
      try {
        const createSignature = await ReactNativeBiometrics.createSignature({
          promptMessage: t('Вхід'),
          cancelButtonText: t('Скасувати'),
          payload: device_id,
        });
        const {success, signature} = createSignature;
        if (success) {
          setModalVisible(false);
          dispatch(loginWithBiometrics({signature, device_id}));
        } else {
          setModalVisible(false);
        }
      } catch (error) {
        setModalVisible(false);
      }
    } else {
      setModalVisible(false);
      Alert.alert('', t('Помилка, авторизуйтесь за допомогою логіна і пароля'));
    }
  };

  useEffect(() => {
    biometrics();
  }, []);

  return (
    <Modal
      isVisible={modalVisible}
      backdropTransitionOutTiming={0}
      backdropColor="#000000"
      backdropOpacity={0.6}
      coverScreen={true}
      style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.green_007E26} />
    </Modal>
  );
};

export default connect()(BiometricsLoginModal);

type TProps = {
  dispatch: any;
};
