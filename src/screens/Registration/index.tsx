import React, {useCallback} from 'react';
import {SafeAreaView, Linking} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  useMemo,
  useTranslation,
  useState,
  useNavigation,
  useEffect,
} from '@hooks';
import {
  View,
  Text,
  UsualButton,
  KeyboardAvoidingView,
  QuestionButton,
  TouchableOpacity,
  Keyboard,
  MaterialInput,
  DateTimePicker,
  CheckBoxCustom,
} from '@components';
import {TGlobalState} from '@types';
import {verticalScale} from '@helpers';
import styles from './styles';
import {ios} from '@constants';
import ModalContent from './ModalContent/ModalContent';

type TProps = {
  appGlobalState: TGlobalState['appGlobalState'];
};

// FIXME:
const loyaltyUrl = 'https://google.com';
const minimumDate = new Date(Date.now() - 3849948144000); // 122 years in ms
const maximumDate = new Date(Date.now() - 568080000000); // 18 years in ms

const Registration: React.FC<TProps> = ({appGlobalState}) => {
  const {t} = useTranslation();
  const {setOptions, navigate} = useNavigation();
  const [nameValue, setNameValue] = useState<string>('');
  const [surnameValue, setSurnameValue] = useState<string>('');
  const [birthdayValue, setBirthdayValue] = useState<Date>(maximumDate);
  const [genderValue, setGenderValue] = useState<{type: number; name: string}>({
    type: 0,
    name: '',
  });
  const [visibleDatePicker, setVisibleDatePicker] = useState<boolean>(false);
  const [consentPersonalData, setConsentPersonalData] =
    useState<boolean>(false);
  const [agreeLoyaltyProgram, setAgreeLoyaltyProgram] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'date' | 'gender'>('date');

  useEffect(() => {
    setOptions({
      headerRight: () => <QuestionButton />,
    });
  }, []);

  const openModal = useCallback(
    (type: 'date' | 'gender') => () => {
      if (type === 'date') {
        setModalType('date');
        ios ? setIsModalVisible(true) : setVisibleDatePicker(true);
      } else {
        setModalType('gender');
        setIsModalVisible(true);
      }
      Keyboard.dismiss();
    },
    [],
  );

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onChangeDate = useCallback((event: any, date: Date | undefined) => {
    if (date) {
      setVisibleDatePicker(false);
      setBirthdayValue(date);
    }
  }, []);

  const onChangeGender = useCallback(value => {
    setGenderValue(value);
    closeModal();
  }, []);

  const dateValue = useMemo(() => {
    return birthdayValue !== maximumDate
      ? moment(birthdayValue).format('DD.MM.YYYY')
      : '';
  }, [birthdayValue]);

  const onPressLoyalty = useCallback(() => {
    try {
      Linking.openURL(loyaltyUrl);
    } catch (error) {
      console.log('onPressLoyalty error', error);
    }
  }, []);

  //   FIXME:
  const submit = useCallback(async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('BonusCardCheck');
    }, 1000);
    // const { data } = await AuthService.checkPhone(phoneNumber)
  }, []);

  const personalDataText = useMemo(() => {
    return (
      <Text style={styles.checkboxText} numberOfLines={2}>
        {t('Даю згоду на обробку моїх персональних даних')}
      </Text>
    );
  }, []);

  const loyaltyDataText = useMemo(() => {
    return (
      <Text style={styles.checkboxText} numberOfLines={2}>
        {t('Погоджуюсь із правилами ')}
        <Text style={styles.checkBoxLink} onPress={onPressLoyalty}>
          {t('Програми лояльності')}
        </Text>
      </Text>
    );
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={verticalScale(100)}
        enabled={false}
        style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {t('text.enterYourPersonalInformation')}
          </Text>
          <MaterialInput
            keyboardType={'ascii-capable'}
            returnKeyType={'default'}
            value={nameValue}
            onChangeText={setNameValue}
            label={t('textInput.name')}
          />
          <MaterialInput
            keyboardType={'ascii-capable'}
            returnKeyType={'default'}
            value={surnameValue}
            onChangeText={setSurnameValue}
            label={t('textInput.surname')}
          />
          <View>
            <TouchableOpacity
              style={styles.buttonTI}
              onPress={openModal('date')}
            />
            <MaterialInput
              renderRightAccessory
              rightAccessoryName={'calendar-dates'}
              value={dateValue}
              label={t('textInput.dateOfBirth')}
              disabled={true}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonTI}
              onPress={openModal('gender')}
            />
            <MaterialInput
              renderRightAccessory
              rightAccessoryName={'arrow-down'}
              returnKeyType={'next'}
              value={genderValue.name}
              label={t('textInput.sex')}
              disabled={true}
            />
          </View>
          <View>
            <CheckBoxCustom
              value={consentPersonalData}
              toggleValue={setConsentPersonalData}
              text={personalDataText}
            />
            <CheckBoxCustom
              value={agreeLoyaltyProgram}
              toggleValue={setAgreeLoyaltyProgram}
              text={loyaltyDataText}
            />
          </View>
        </View>
        <UsualButton
          title={t('button.title.continue')}
          loading={loading}
          dark={loading}
          disabled={
            !nameValue ||
            !surnameValue ||
            birthdayValue === maximumDate ||
            !genderValue.name ||
            !consentPersonalData ||
            !agreeLoyaltyProgram ||
            loading
          }
          buttonStyle={styles.usualButton}
          onPress={submit}
        />
      </KeyboardAvoidingView>
      {visibleDatePicker && (
        <DateTimePicker
          locale={appGlobalState.lang}
          value={birthdayValue}
          onChange={onChangeDate}
          display={'default'}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          textColor={'#000000'}
        />
      )}
      <ModalContent
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        birthdayValue={birthdayValue}
        onChangeDate={onChangeDate}
        modalType={modalType}
        onChangeGender={onChangeGender}
        genderValue={genderValue}
      />
    </SafeAreaView>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  appGlobalState: state.appGlobalState,
});

export default connect(mapStateToProps)(Registration);
