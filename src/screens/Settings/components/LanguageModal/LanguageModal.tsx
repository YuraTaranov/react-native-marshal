import React from 'react';
import {useCallback, useTranslation} from '@hooks';
import {View, Text, Modal, TouchableOpacity} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {changeLang} from '@reducers/appGlobalState';
import {Dispatch} from 'redux';

type TProps = {
  dispatch: Dispatch;
  isVisible: boolean;
  closeModal: () => void;
};

const LanguageModal: React.FC<TProps> = ({dispatch, isVisible, closeModal}) => {
  const {t} = useTranslation();

  const onPressUk = useCallback(() => {
    dispatch(changeLang('uk'));
    closeModal();
  }, []);

  const onPressRu = useCallback(() => {
    dispatch(changeLang('ru'));
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
        <TouchableOpacity onPress={onPressUk}>
          <Text style={styles.title}>{t('Українська')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressRu}>
          <Text style={styles.title}>{t('Російська')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default connect()(LanguageModal);
