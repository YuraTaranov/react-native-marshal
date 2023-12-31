import React from 'react';
import {Dispatch} from 'redux';
import {
  useEffect,
  useCallback,
  useTranslation,
  useState,
  useNavigation,
  useMemo,
} from '@hooks';
import {
  View,
  Text,
  RadioButtonCustom,
  QuestionButton,
  Icon,
  TouchableOpacity,
  TextInputMask,
  Modal,
  QRCodeScanner,
  Image,
  UsualButton,
  request,
  PERMISSIONS,
  PermissionsAndroid,
  OpenAppSettings,
  Alert,
} from '@components';
import {TGlobalState, TBiometricsType} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors, hitSlop, ios, urls} from '@constants';
import {assets} from '@assets';
import {httpPost, errorHandler, navigate} from '@services';
import {setIsUserAuthorized} from '@reducers/appGlobalState';
import {setProfile} from '@reducers/profile';
import {setReferralUserId} from '@reducers/referral';
import {resetLogin} from '@reducers/login';

type TProps = {
  dispatch: Dispatch;
  biometricsType: TBiometricsType;
  referralUserId: string;
};

const BonusCardCheck: React.FC<TProps> = ({
  dispatch,
  biometricsType,
  referralUserId,
}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  const [cardType, setCardType] = useState<{type: number; name: string}>({
    type: 1,
    name: '',
  });
  const [cardNumber, setCardNumber] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCardNumberReadByQR, setIsCardNumberReadByQR] =
    useState<boolean>(false);
  const [permissionsGranted, setPermissionsGranted] = useState<boolean>(false);

  useEffect(() => {
    setOptions({
      headerRight: () => <QuestionButton />,
    });
  }, []);

  useEffect(() => {
    isModalVisible && checkPermissions();
  }, [isModalVisible]);

  const openSettings = useCallback(() => {
    Alert.alert(
      '',
      t(
        'Додаток не може відкрити камеру, оскільки доступ заборонено. Ви хочете змінити дозволи додатку в налаштуваннях пристрою?',
      ),
      [
        {
          text: t('Так'),
          onPress: () => {
            OpenAppSettings.open();
            setIsModalVisible(false);
          },
          style: 'default',
        },
        {
          text: t('Ні'),
          onPress: () => {
            setIsModalVisible(false);
          },
          style: 'cancel',
        },
      ],
    );
  }, [t]);

  const checkPermissions = useCallback(async () => {
    if (ios) {
      const iosCameraAvailable = await request(PERMISSIONS.IOS.CAMERA);
      setPermissionsGranted(iosCameraAvailable === 'granted');
      if (iosCameraAvailable !== 'granted') {
        openSettings();
      }
    } else {
      const androidCameraAvailable = await PermissionsAndroid.request(
        PERMISSIONS.ANDROID.CAMERA,
      );
      setPermissionsGranted(androidCameraAvailable === 'granted');
      if (androidCameraAvailable !== 'granted') {
        openSettings();
      }
    }
  }, []);

  const onChangeCardNumber = useCallback(text => {
    setIsCardNumberReadByQR(false);
    setCardNumber(text);
  }, []);

  const onChangeGender = useCallback(value => {
    setCardType(value);
  }, []);

  const openModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onReadQR: (e: any) => void = useCallback((e: any) => {
    if (e.data) {
      setCardNumber(e.data.replace(/ /g, ''));
      setIsCardNumberReadByQR(true);
      setTimeout(() => {
        closeModal();
      }, 700);
    }
  }, []);

  const isButtonNextDisabled = useMemo(() => {
    if (
      cardType.type === 1 &&
      !isCardNumberReadByQR &&
      cardNumber.length !== 19
    ) {
      return true;
    }
    if (
      cardType.type === 1 &&
      isCardNumberReadByQR &&
      cardNumber.length !== 16
    ) {
      return true;
    }
    if (cardType.type === 2) {
      return true;
    }
    return false;
  }, [cardType, isCardNumberReadByQR, cardNumber]);

  const submit = useCallback(async () => {
    setLoading(true);
    const refUserId = referralUserId ? referralUserId : '';
    try {
      const body =
        cardType.type === 1
          ? await httpPost(urls.addCardOld, {
              card: cardNumber.replace(/ /g, ''),
              parent_user_id: refUserId,
            })
          : await httpPost(urls.addCardNew, {parent_user_id: refUserId});
      setLoading(false);
      if (body.status === 200) {
        dispatch(setProfile(body.data.data));
        dispatch(setReferralUserId(''));
        dispatch(resetLogin());
        biometricsType !== 'none'
          ? navigate('Biometrics')
          : dispatch(setIsUserAuthorized(true));
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error, 'add card old error');
    }
  }, [cardNumber, cardType.type, biometricsType, referralUserId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('У вас є картка Marshal CardName?')}</Text>
      <RadioButtonCustom
        text={t('Так, я маю фізичну картку Marshal CardName')}
        active={cardType.type === 1}
        onChange={onChangeGender}
        type={1}
      />
      <View style={styles.inputContainer}>
        <TextInputMask
          style={styles.input}
          maxLength={19}
          keyboardType={'number-pad'}
          returnKeyType="done"
          value={cardNumber}
          //   mask={'[0000] [000000]'}
          mask={'[0000] [0000] [0000] [0000]'}
          onChangeText={onChangeCardNumber}
          //   placeholder="XXXX XXXXXX"
          placeholder="XXXX XXXX XXXX XXXX"
          placeholderTextColor={colors.gray_8D909D}
          editable={cardType.type === 1}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={openModal}>
          <Icon name="scan" size={24} />
        </TouchableOpacity>
      </View>
      <RadioButtonCustom
        text={t('Ні, я хочу отримати віртуальну картку Marshal CardName')}
        active={cardType.type === 3}
        onChange={onChangeGender}
        type={3}
      />
      <View style={styles.buttonContainer}>
        <UsualButton
          title={t('button.title.continue')}
          loading={loading}
          dark={loading}
          disabled={isButtonNextDisabled}
          onPress={submit}
        />
      </View>
      <Modal
        isVisible={isModalVisible}
        backdropTransitionOutTiming={0}
        backdropColor="#000000"
        backdropOpacity={0.5}
        coverScreen={true}
        style={styles.modalContainer}>
        <View style={styles.modalContentContainer}>
          {permissionsGranted ? (
            <QRCodeScanner
              onRead={onReadQR}
              cameraStyle={styles.absolute}
              containerStyle={styles.absolute}
            />
          ) : null}
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>
              {t('Сканування штрих-коду картки')}
            </Text>
            <TouchableOpacity
              style={styles.closeModalContainer}
              onPress={closeModal}
              hitSlop={hitSlop}>
              <Icon name="x" size={24} color={colors.white_FFFFFF} />
            </TouchableOpacity>
          </View>
          <View style={styles.qrInfoBlock}>
            <Image source={assets.QR_SCAN} style={styles.qrScanner} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  biometricsType: state.biometrics.biometricsType,
  referralUserId: state.referral.userId,
});

export default connect(mapStateToProps)(BonusCardCheck);
