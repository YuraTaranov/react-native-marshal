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
  GradientBorder,
} from '@components';
import styles from './styles';
import moment from 'moment';
import {navigate, errorHandler, httpPost, goBack} from '@services';
import {setProfile} from '@reducers/profile';
import {urls, ios, colors, gradients} from '@constants';
import {connect} from 'react-redux';
import {TBiometricsType, TGlobalState, TProfile} from '@types';
import {Dispatch} from 'redux';
import {Alert} from 'react-native';
import {setIsUserAuthorized} from '@reducers/appGlobalState';

type TProps = {
  appGlobalState: TGlobalState['appGlobalState'];
  dispatch: Dispatch;
  isRegistration: boolean;
  profile: TProfile;
  biometricsType: TBiometricsType;
};

const loyaltyUrl = 'http://marshal.ua/rules/';
const minimumDate = new Date(Date.now() - 3849948144000); // 122 years in ms
const maximumDate = new Date(Date.now() - 568080000000); // 18 years in ms
const initialDate = new Date(Date.now() - 599184000000); // 19 years in ms

const ProfileUpdate: React.FC<TProps> = ({
  dispatch,
  appGlobalState,
  isRegistration,
  profile,
  biometricsType,
}) => {
  const {t} = useTranslation();
  const [nameValue, setNameValue] = useState<string>(profile?.name || '');
  const [surnameValue, setSurnameValue] = useState<string>(
    profile?.surname || '',
  );
  const [birthdayValue, setBirthdayValue] = useState<Date>(
    (profile?.birthday && new Date(profile?.birthday)) || initialDate,
  );
  const [phoneValue, setPhoneValue] = useState<string>(
    profile?.phone.slice(4) || '',
  );
  const [genderValue, setGenderValue] = useState<{type: number; name: string}>({
    type:
      profile?.gender !== null
        ? profile?.gender === 'female'
          ? 1
          : profile?.gender === 'male'
          ? 2
          : 3
        : 0,
    name:
      profile?.gender !== null
        ? profile?.gender === 'male'
          ? t('Чоловіча')
          : profile?.gender === 'female'
          ? t('Жіноча')
          : t('Не вказувати')
        : '',
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
    return birthdayValue !== initialDate
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
    } else {
      setVisibleDatePicker(false);
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
      return 'female';
    }
    if (genderValue.type === 2) {
      return 'male';
    }
    if (genderValue.type === 3) {
      return '';
    }
  }, [genderValue.type]);

  const submit = useCallback(async () => {
    setLoading(true);
    const initialPhone = profile?.phone.slice(4);
    const phone = phoneValue.replace(/ /g, '');
    try {
      const data = isRegistration
        ? {
            name: nameValue,
            surname: surnameValue,
            birthday: moment(birthdayValue).format('YYYY-MM-DD'),
            gender,
          }
        : initialPhone === phone
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
            phone: `+380${phone}`,
          };
      const body = await httpPost(urls.profileUpdate, data);
      setLoading(false);
      if (body.status === 200) {
        dispatch(setProfile(body.data.data));
        if (isRegistration) {
          biometricsType !== 'none'
            ? navigate('Biometrics') // BonusCardCheck
            : dispatch(setIsUserAuthorized(true));
        } else {
          Alert.alert('', t('Дані профілю оновлені'));
          goBack();
        }
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error, 'registration error');
    }
  }, [
    phoneValue,
    isRegistration,
    nameValue,
    surnameValue,
    birthdayValue,
    gender,
    dispatch,
    t,
    profile?.phone,
  ]);

  const formatPhone = formatWithMask({
    text: phoneValue,
    mask: [/\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
  });

  const isButtonDisabled = useMemo(() => {
    if (isRegistration) {
      return (
        !nameValue ||
        !nameValue.trim() ||
        !surnameValue ||
        !surnameValue.trim() ||
        birthdayValue === maximumDate ||
        !genderValue.name ||
        !consentPersonalData ||
        // !agreeLoyaltyProgram ||
        loading
      );
    } else {
      return (
        !nameValue ||
        !surnameValue ||
        !nameValue.trim() ||
        !surnameValue.trim() ||
        birthdayValue === maximumDate ||
        !genderValue.name ||
        // phoneValue.length < 9 ||
        loading
      );
    }
  }, [
    isRegistration,
    nameValue,
    surnameValue,
    birthdayValue,
    genderValue.name,
    consentPersonalData,
    agreeLoyaltyProgram,
    loading,
  ]);

  const personalDataText = useMemo(() => {
    return (
      <Text style={styles.checkboxText} numberOfLines={2}>
        {t('Даю згоду на обробку моїх персональних даних')}
      </Text>
    );
  }, [t]);

  const loyaltyDataText = useMemo(() => {
    return (
      <Text style={styles.checkboxText} numberOfLines={2}>
        {t('Погоджуюсь із правилами')}{' '}
        <Text style={styles.checkBoxLink} onPress={onPressLoyalty}>
          {t('Програми лояльності')}
        </Text>
      </Text>
    );
  }, [t]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {isRegistration ? (
            <Text style={styles.title}>
              {t('text.enterYourPersonalInformation')}
            </Text>
          ) : null}
          <>
            <MaterialInput
              returnKeyType={'default'}
              value={nameValue}
              onChangeText={setNameValue}
              maxLength={25}
              textColor={colors.black_1A1718}
              lineWidth={0}
              activeLineWidth={0}
              label={t('textInput.name')}
            />
            <GradientBorder
              colors={gradients.gray}
              style={styles.gradientBorder}
            />
          </>
          <>
            <MaterialInput
              returnKeyType={'default'}
              value={surnameValue}
              lineWidth={0}
              activeLineWidth={0}
              textColor={colors.black_1A1718}
              maxLength={30}
              onChangeText={setSurnameValue}
              label={t('textInput.surname')}
            />
            <GradientBorder
              colors={gradients.gray}
              style={styles.gradientBorder}
            />
          </>
          <View>
            <TouchableOpacity
              style={styles.buttonTI}
              onPress={openModal('date')}
            />
            <MaterialInput
              renderRightAccessory
              rightAccessoryColor={colors.gray_888A8E}
              rightAccessoryName={'arrow-down'}
              value={dateValue}
              label={t('textInput.dateOfBirth')}
              disabled={true}
              textColor={colors.black_1A1718}
              disabledLineWidth={0}
              lineWidth={0}
              activeLineWidth={0}
            />
            <GradientBorder
              colors={gradients.gray}
              style={styles.gradientBorder}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonTI}
              onPress={openModal('gender')}
            />
            <MaterialInput
              renderRightAccessory
              rightAccessoryColor={colors.gray_888A8E}
              rightAccessoryName={'arrow-down'}
              returnKeyType={'next'}
              value={genderValue.name}
              textColor={colors.black_1A1718}
              label={t('textInput.sex')}
              disabled={true}
              disabledLineWidth={0}
              lineWidth={0}
              activeLineWidth={0}
            />
            <GradientBorder
              colors={gradients.gray}
              style={styles.gradientBorder}
            />
          </View>
          {isRegistration ? (
            <View>
              <CheckBoxCustom
                value={consentPersonalData}
                toggleValue={setConsentPersonalData}
                text={personalDataText}
              />
              {/* TODO: loyalty program link */}
              {/* <CheckBoxCustom
                value={agreeLoyaltyProgram}
                toggleValue={setAgreeLoyaltyProgram}
                text={loyaltyDataText}
              /> */}
            </View>
          ) : null}
          {!isRegistration ? (
            <>
              <MaterialInput
                keyboardType={'number-pad'}
                returnKeyType={'done'}
                value={formatPhone.masked}
                onChangeText={setPhoneValue}
                maxLength={12}
                label={t('Номер телефону')}
                prefix="+380"
                onFocus={onPhoneFocus}
                textColor={colors.gray_8D909D}
                onBlur={onPhoneBlur}
                disabled={true}
                disabledLineWidth={0}
                lineWidth={0}
                activeLineWidth={0}
              />
              <GradientBorder
                colors={gradients.gray}
                style={styles.gradientBorder}
              />
            </>
          ) : null}
        </View>
      </View>
      {visibleDatePicker ? (
        <DateTimePicker
          locale={appGlobalState.lang}
          value={birthdayValue}
          onChange={onChangeDate}
          display={'default'}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          textColor={'#000000'}
        />
      ) : null}
      {isRegistration ? (
        <View
          style={{
            ...styles.buttonContainer,
            marginBottom: !isRegistration ? 24 : 0,
          }}>
          <UsualButton
            title={t('button.title.continue')}
            loading={loading}
            dark={loading}
            disabled={isButtonDisabled}
            buttonStyle={styles.usualButton}
            onPress={submit}
          />
        </View>
      ) : null}
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
  biometricsType: state.biometrics.biometricsType,
});

export default connect(mapStateToProps)(ProfileUpdate);
