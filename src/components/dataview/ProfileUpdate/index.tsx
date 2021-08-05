import React from 'react';
import {useCallback, useMemo, useTranslation, useState} from '@hooks';
import {
  View,
  Text,
  MaterialInput,
  DateTimePicker,
  TouchableOpacity,
  Keyboard,
  Linking,
  CheckBoxCustom,
  UsualButton,
  ProfileUpdateModal,
} from '@components';
import styles from './styles';
import moment from 'moment';
import {navigate, errorHandler, httpPost} from '@services';
import {setProfile} from '@reducers/profile';
import {urls, ios} from '@constants';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {Dispatch} from 'redux';

type TProps = {
  appGlobalState: TGlobalState['appGlobalState'];
  dispatch: Dispatch;
  isRegistration: boolean;
};

// FIXME:
const loyaltyUrl = 'https://google.com';
const minimumDate = new Date(Date.now() - 3849948144000); // 122 years in ms
const maximumDate = new Date(Date.now() - 568080000000); // 18 years in ms

const ProfileUpdate: React.FC<TProps> = ({
  dispatch,
  appGlobalState,
  isRegistration,
}) => {
  const {t} = useTranslation();
  //   FIXME: initial values
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

  const dateValue = useMemo(() => {
    return birthdayValue !== maximumDate
      ? moment(birthdayValue).format('DD.MM.YYYY')
      : '';
  }, [birthdayValue]);

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

  const onPressLoyalty = useCallback(() => {
    try {
      Linking.openURL(loyaltyUrl);
    } catch (error) {
      console.log('onPressLoyalty error', error);
    }
  }, []);

  const gender = useMemo(() => {
    if (genderValue.type === 1) return 'male';
    if (genderValue.type === 2) return 'female';
    if (genderValue.type === 3) return '';
  }, [genderValue.type]);

  const submit = useCallback(async () => {
    setLoading(true);
    try {
      const body = await httpPost(urls.profileUpdate, {
        name: nameValue,
        surname: surnameValue,
        birthday: birthdayValue,
        gender,
      });
      setLoading(false);
      if (body.status === 200) {
        dispatch(setProfile(body.data.data));
        navigate('BonusCardCheck');
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error, 'registration error');
    }
  }, [nameValue, surnameValue, birthdayValue, genderValue]);

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
    <>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {isRegistration ? (
            <Text style={styles.title}>
              {t('text.enterYourPersonalInformation')}
            </Text>
          ) : null}
          <MaterialInput
            keyboardType={'ascii-capable'}
            returnKeyType={'default'}
            value={nameValue}
            onChangeText={setNameValue}
            lineWidth={0.5}
            label={t('textInput.name')}
          />
          <MaterialInput
            keyboardType={'ascii-capable'}
            returnKeyType={'default'}
            value={surnameValue}
            lineWidth={0.5}
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
          {isRegistration ? (
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
          ) : null}
        </View>
      </View>
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
      <View style={styles.buttonContainer}>
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
      </View>
      <ProfileUpdateModal
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        birthdayValue={birthdayValue}
        onChangeDate={onChangeDate}
        modalType={modalType}
        onChangeGender={onChangeGender}
        genderValue={genderValue}
      />
    </>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  appGlobalState: state.appGlobalState,
});

export default connect(mapStateToProps)(ProfileUpdate);
