import React from 'react';
import {
  View,
  Text,
  Modal,
  DateTimePicker,
  RadioButtonCustom,
  Icon,
} from '@components';
import {darkMode} from '@constants';
import {useMemo, useTranslation} from '@hooks';
import styles from './styles';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';

const minimumDate = new Date(Date.now() - 3849948144000); // 122 years in ms
const maximumDate = new Date(Date.now() - 568080000000); // 18 years in ms

const CheckBoxCustom: React.FC<TProps> = ({
  appGlobalState,
  closeModal,
  isModalVisible,
  birthdayValue,
  onChangeDate,
  modalType,
  onChangeGender,
  genderValue,
}) => {
  const {t} = useTranslation();

  const isModalTypeDate = modalType === 'date';

  const modalStyles = useMemo(() => {
    return {...styles.modalContainer, height: isModalTypeDate ? 400 : 250};
  }, [isModalTypeDate]);

  const modalContent = useMemo(() => {
    if (isModalTypeDate) {
      return (
        <DateTimePicker
          locale={appGlobalState.lang}
          value={birthdayValue}
          onChange={onChangeDate}
          display={'inline'}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          textColor={'#000000'}
          // themeVariant={darkMode ? 'light' : 'dark'}
          themeVariant={'light'}
        />
      );
    } else {
      return (
        <View style={styles.genderContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.genderTitle}>{t('Стать')}:</Text>
            <Icon name="x" size={24} onPress={closeModal} />
          </View>
          <RadioButtonCustom
            text={t('Жіноча')}
            active={genderValue.type === 1}
            onChange={onChangeGender}
            type={1}
          />
          <RadioButtonCustom
            text={t('Чоловіча')}
            active={genderValue.type === 2}
            onChange={onChangeGender}
            type={2}
          />
          <RadioButtonCustom
            text={t('Не вказувати')}
            active={genderValue.type === 3}
            onChange={onChangeGender}
            type={3}
          />
        </View>
      );
    }
  }, [modalType, birthdayValue, appGlobalState.lang, genderValue.type]);

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={closeModal}
      backdropTransitionOutTiming={0}
      backdropColor="#000000"
      backdropOpacity={0.5}
      coverScreen={true}
      style={modalStyles}>
      {modalContent}
    </Modal>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  appGlobalState: state.appGlobalState,
});

export default connect(mapStateToProps)(CheckBoxCustom);

type TProps = {
  appGlobalState: TGlobalState['appGlobalState'];
  closeModal: () => void;
  isModalVisible: boolean;
  birthdayValue: Date;
  onChangeDate: (event: any, date: Date | undefined) => void;
  modalType: 'date' | 'gender';
  onChangeGender: (value: any) => void;
  genderValue: {type: number; name: string};
};
