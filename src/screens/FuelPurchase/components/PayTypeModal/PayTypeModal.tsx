import React from 'react';
import {
  useNavigation,
  useTranslation,
  useState,
  useEffect,
  useRoute,
} from '@hooks';
import {
  Icon,
  Modal,
  Text,
  TouchableOpacity,
  UsualButton,
  View,
} from '@components';
import {ModalRow} from '..';

import styles from './styles';
import {colors, hitSlop} from '@constants';

//Type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {TPaySystemContent} from '@types';

type TProps = {
  isVisible: boolean;
  paySystems: TPaySystemContent[];
  closeModal: () => void;
  onSelect: (id: number) => void;
  onChoose: () => void;
};

const PayTypeModal: React.FC<TProps> = ({
  isVisible,
  closeModal,
  paySystems,
  onSelect,
  onChoose,
}) => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();

  const onSelectedItem = (id: number) => () => {
    if (id === 100) {
      navigate('AddCard', {openModal: true});
      closeModal();
    } else {
      onSelect(id);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropTransitionOutTiming={0}
      backdropColor="#000000"
      backdropOpacity={0.5}
      onBackdropPress={closeModal}
      style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <Text style={styles.confirm}>{t('CheckPaymentMethod')}</Text>
          <TouchableOpacity onPress={closeModal} hitSlop={hitSlop}>
            <Icon size={24} name="x" color={colors.black_000000} />
          </TouchableOpacity>
        </View>
        {paySystems.map(item => (
          <ModalRow
            {...item}
            onSelected={onSelectedItem(item.id)}
            key={`${item.id}`}
          />
        ))}
        <View style={styles.row}>
          <UsualButton
            title={t('Select')}
            onPress={onChoose}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PayTypeModal;
