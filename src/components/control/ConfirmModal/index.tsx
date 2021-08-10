import React from 'react';
import {useTranslation} from '@hooks';
import {View, Text, Modal, Icon, TouchableOpacity} from '@components';
import styles from './styles';
import {colors, hitSlop} from '@constants';
import GhostButton from '../GhostButton';
import UsualButton from '../UsualButton';

type TProps = {
  isVisible: boolean;
  closeModal: () => void;
  title: string;
  leftButtonText: string;
  rightButtonText: string;
  rightButtonOnPress: () => void;
};

const ConfirmModal: React.FC<TProps> = ({
  isVisible,
  closeModal,
  title,
  leftButtonText,
  rightButtonText,
  rightButtonOnPress,
}) => {
  const {t} = useTranslation();

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
          <Text style={styles.confirm}>{t('Підтвердження')}</Text>
          <TouchableOpacity onPress={closeModal} hitSlop={hitSlop}>
            <Icon size={24} name="x" color={colors.black_000000} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          <GhostButton
            title={leftButtonText}
            onPress={closeModal}
            buttonStyle={styles.buttonStyle}
          />
          <UsualButton
            title={rightButtonText}
            onPress={rightButtonOnPress}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
