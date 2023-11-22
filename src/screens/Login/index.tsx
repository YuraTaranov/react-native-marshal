import React from 'react';
import {Dispatch} from 'redux';
import {SafeAreaView, TextInput} from 'react-native';
import {
  useMemo,
  useTranslation,
  useState,
  useNavigation,
  useRef,
  useEffect,
  useCallback,
} from '@hooks';
import {
  View,
  Text,
  UsualButton,
  TextInputMask,
  KeyboardAvoidingView,
  QuestionButton,
  Icon,
  TouchableOpacity,
  Keyboard,
  ReactNativeBiometrics,
  Image,
} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '@constants';
import {verticalScale} from '@helpers';
import {setPhone, checkPhone} from '@reducers/login';
import {setBiometricsType} from '@reducers/biometrics';
import BiometricsLoginModal from './components/BiometricsLoginModal/BiometricsLoginModal';
import {assets} from '@assets';

type TProps = {
  dispatch: Dispatch;
  phone: string;
  loading: boolean;
  faceIdActiveLocal: boolean;
  biometricsType: string;
};

const Login: React.FC<TProps> = ({
  dispatch,
  phone,
  loading,
  faceIdActiveLocal,
  biometricsType,
}) => {
  const {t} = useTranslation();
  const textInputMaskRef = useRef<TextInput>(null);
  const {setOptions} = useNavigation();
  const [textInputFocus, setTextInputFocus] = useState<boolean>(false);
  const [bioModalVisible, setBioModalVisible] = useState<boolean>(false);

  ReactNativeBiometrics.isSensorAvailable().then(async resultObject => {
    const {available, biometryType} = resultObject;
    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      dispatch(setBiometricsType('touchId'));
    } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
      dispatch(setBiometricsType('faceId'));
    } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      try {
        await ReactNativeBiometrics.createKeys();
        dispatch(setBiometricsType('fingerprint'));
      } catch (error) {
        dispatch(setBiometricsType('none'));
      }
    } else {
      dispatch(setBiometricsType('none'));
    }
  });

  useEffect(() => {
    textInputMaskRef.current?.focus();
  }, []);

  useEffect(() => {
    setOptions({
      headerRight: () => <QuestionButton />,
    });
  }, []);

  const onChangeText = useCallback((val: string | undefined) => {
    dispatch(setPhone(val || ''));
  }, []);

  const submit = useCallback(async () => {
    Keyboard.dismiss();
    dispatch(checkPhone({needNavigate: true}));
  }, []);

  const clearPhoneNumber = useCallback(() => {
    dispatch(setPhone(''));
  }, []);

  const setInputFocusTrue = useCallback(() => {
    setTextInputFocus(true);
  }, []);

  const setInputFocusFalse = useCallback(() => {
    setTextInputFocus(false);
  }, []);

  const changeText = useCallback((formatted, extracted) => {
    onChangeText(extracted);
  }, []);

  const onPressBio = useCallback(() => {
    setBioModalVisible(true);
  }, []);

  const disabled = useMemo(() => phone.length < 9, [phone]);

  const textInputBorderColor = useMemo(() => {
    return {
      borderBottomColor:
        textInputFocus || phone.length || loading
          ? colors.gray_2D2D2D
          : colors.gray_E1E1E8,
    };
  }, [phone, textInputFocus]);

  const bioImage = useMemo(() => {
    if (biometricsType === 'touchId') {
      return assets.TOUCH_ID_IOS;
    }
    if (biometricsType === 'faceId') {
      return assets.FACE_ID;
    }
    if (biometricsType === 'fingerprint') {
      return assets.TOUCH_ID;
    }
  }, [biometricsType]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {faceIdActiveLocal && bioModalVisible ? <BiometricsLoginModal /> : null}
      <KeyboardAvoidingView
        keyboardVerticalOffset={verticalScale(90)}
        style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t('text.enterYourPhoneNumber')}</Text>
          <View style={[styles.phoneNumberView, textInputBorderColor]}>
            <View style={styles.prefixContainer}>
              <Text style={styles.prefix}>+380 </Text>
            </View>
            <TextInputMask
              ref={textInputMaskRef}
              onFocus={setInputFocusTrue}
              onBlur={setInputFocusFalse}
              style={styles.textInput}
              maxLength={12}
              keyboardType={'number-pad'}
              value={phone}
              mask={'[00] [000] [00] [00]'}
              onChangeText={changeText}
              editable={!loading}
              returnKeyType="done"
            />
            {phone.length ? (
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={clearPhoneNumber}
                disabled={loading}>
                <Icon name={'Union'} color={colors.black_000000} size={14} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <UsualButton
            title={t('button.title.continue')}
            loading={loading}
            dark={loading || !disabled}
            disabled={disabled}
            buttonStyle={styles.buttonStyle}
            onPress={submit}
          />
          {faceIdActiveLocal ? (
            <TouchableOpacity
              onPress={onPressBio}
              style={styles.bioButtonContainer}>
              <Image
                style={styles.bioImage}
                resizeMode="contain"
                source={bioImage}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  phone: state.login.phone,
  loading: state.login.loading,
  faceIdActiveLocal: state.biometrics.faceIdActiveLocal,
  biometricsType: state.biometrics.biometricsType,
  bioTurnOffAfterLogout: state.logout.bioTurnOffAfterLogout,
});

export default connect(mapStateToProps)(Login);
