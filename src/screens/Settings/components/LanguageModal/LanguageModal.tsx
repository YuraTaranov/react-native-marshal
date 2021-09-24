import React from 'react';
import {useCallback, useTranslation} from '@hooks';
import {
  View,
  Modal,
  RadioButtonCustom,
  TouchableOpacity,
  Icon,
  Text,
} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {changeLang} from '@reducers/appGlobalState';
import {Dispatch} from 'redux';
import {colors, hitSlop} from '@constants';

type TProps = {
  dispatch: Dispatch;
  isVisible: boolean;
  closeModal: () => void;
  language: string;
};

type TRadioButtonCBParams = {
  type: number;
  text: string;
};

const LanguageModal: React.FC<TProps> = ({
  dispatch,
  isVisible,
  closeModal,
  language,
}) => {
  const {t} = useTranslation();

  const onPressLang = useCallback((params: TRadioButtonCBParams) => {
    if (params.type === 1) {
      dispatch(changeLang('uk'));
    } else {
      dispatch(changeLang('ru'));
    }
    closeModal();
  }, []);

  return (
    <Modal
      isVisible={isVisible}
      backdropTransitionOutTiming={0}
      backdropColor="#000000"
      backdropOpacity={0.5}
      onBackdropPress={closeModal}
      style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('Мова')}:</Text>
          <TouchableOpacity onPress={closeModal} hitSlop={hitSlop}>
            <Icon name="x" size={24} color={colors.black_000000} />
          </TouchableOpacity>
        </View>
        <RadioButtonCustom
          text={t('Українська')}
          active={language === 'uk'}
          onChange={onPressLang}
          type={1}
        />
        <RadioButtonCustom
          text={t('Російська')}
          active={language === 'ru'}
          onChange={onPressLang}
          type={2}
        />
      </View>
    </Modal>
  );
};

export default connect()(LanguageModal);
