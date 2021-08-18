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
  formatWithMask,
} from '@components';
import styles from './styles';
import moment from 'moment';
import {navigate, errorHandler, httpPost, goBack} from '@services';
import {setProfile} from '@reducers/profile';
import {urls, ios, colors, darkMode} from '@constants';
import {connect} from 'react-redux';
import {TGlobalState, TProfile} from '@types';
import {Dispatch} from 'redux';
import {Alert} from 'react-native';

type TProps = {
  appGlobalState: TGlobalState['appGlobalState'];
  dispatch: Dispatch;
  isRegistration: boolean;
  profile: TProfile;
};

// FIXME:
const loyaltyUrl = 'https://google.com';
const minimumDate = new Date(Date.now() - 3849948144000); // 122 years in ms
const maximumDate = new Date(Date.now() - 568080000000); // 18 years in ms

const ProfileUpdate: React.FC<TProps> = ({
  dispatch,
  appGlobalState,
  isRegistration,
  profile,
}) => {
  const {t} = useTranslation();
  const [nameValue, setNameValue] = useState<string>(profile?.name || '');
  const [surnameValue, setSurnameValue] = useState<string>(
    profile?.surname || '',
  );
  const [birthdayValue, setBirthdayValue] = useState<Date>(
    (profile?.birthday && new Date(profile?.birthday)) || maximumDate,
  );
  const [phoneValue, setPhoneValue] = useState<string>(
    profile?.phone.slice(4) || '',
  );
  //   FIXME: типы пола
  const [genderValue, setGenderValue] = useState<{type: number; name: string}>({
    type: profile?.gender ? (profile?.gender === 'male' ? 1 : 2) : 0,
    name: profile?.gender
      ? profile?.gender === 'male'
        ? 'Чоловіча'
        : 'Жіноча'
      : 'Не вказувати',
  });
  const [visibleDatePicker, setVisibleDatePicker] = useState<boolean>(false);
  const [consentPersonalData, setConsentPersonalData] =
    useState<boolean>(false);
  const [agreeLoyaltyProgram, setAgreeLoyaltyProgram] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'date' | 'gender'>('date');
  const [isPhoneFocus, setIsPhoneFocus] = useState<boolean>(false);

  const onPhoneFocus = useCallback(() => {
    setIsPhoneFocus(true);
  }, []);
  const onPhoneBlur = useCallback(() => {
    setIsPhoneFocus(false);
  }, []);

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
    if (genderValue.type === 1) {
      return 'male';
    }
    if (genderValue.type === 2) {
      return 'female';
    }
    if (genderValue.type === 3) {
      return '';
    }
  }, [genderValue.type]);

  const submit = useCallback(async () => {
    setLoading(true);

    try {
      const data = isRegistration
        ? {
            name: nameValue,
            surname: surnameValue,
            birthday: moment(birthdayValue).format('YYYY-MM-DD'),
            gender,
          }
        : {
            name: nameValue,
            surname: surnameValue,
            birthday: moment(birthdayValue).format('YYYY-MM-DD'),
            gender,
            phone: `+380${phoneValue.replace(/ /g, '')}`,
          };
      const body = await httpPost(urls.profileUpdate, data);
      setLoading(false);
      if (body.status === 200) {
        dispatch(setProfile(body.data.data));
        if (isRegistration) {
          navigate('BonusCardCheck');
        } else {
          Alert.alert('', t('Дані профілю оновлені'));
          goBack();
        }
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error, 'registration error');
    }
  }, [nameValue, surnameValue, birthdayValue, genderValue, phoneValue]);

  const formatPhone = formatWithMask({
    text: phoneValue,
    mask: [/\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
  });

  const isButtonDisabled = useMemo(() => {
    if (isRegistration) {
      return (
        !nameValue ||
        !surnameValue ||
        birthdayValue === maximumDate ||
        !genderValue.name ||
        !consentPersonalData ||
        !agreeLoyaltyProgram ||
        loading
      );
    } else {
      return (
        !nameValue ||
        !surnameValue ||
        birthdayValue === maximumDate ||
        !genderValue.name ||
        phoneValue.length < 9 ||
        loading
      );
    }
  }, [
    nameValue,
    surnameValue,
    birthdayValue,
    genderValue,
    consentPersonalData,
    agreeLoyaltyProgram,
    phoneValue,
    loading,
  ]);

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
          {!isRegistration ? (
            <MaterialInput
              keyboardType={'number-pad'}
              returnKeyType={'done'}
              value={formatPhone.masked}
              onChangeText={setPhoneValue}
              lineWidth={0.5}
              maxLength={12}
              label={t('Номер телефону')}
              prefix="+380"
              onFocus={onPhoneFocus}
              onBlur={onPhoneBlur}
              baseColor={
                isPhoneFocus ? colors.black_000000 : colors.gray_8D909D
              }
            />
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
          themeVariant={darkMode ? 'dark' : 'light'}
        />
      )}
      <View style={styles.buttonContainer}>
        <UsualButton
          title={
            isRegistration ? t('button.title.continue') : t('Прийняти зміни')
          }
          loading={loading}
          dark={loading}
          disabled={isButtonDisabled}
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
  profile: state.profile.data,
});

export default connect(mapStateToProps)(ProfileUpdate);
