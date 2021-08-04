import React from 'react';
import {useTranslation} from '@hooks';
import {View, Modal, Text, Icon, TouchableOpacity, QRCode} from '@components';
import styles from './styles';
import {colors, hitSlop} from '@constants';

type TProps = {
  isVisible: boolean;
  closeModal: () => void;
};

// FIXME:
const bonusCard = 'XXXX XXXX XXXX XXXX';

const BonusCardModal: React.FC<TProps> = ({isVisible, closeModal}) => {
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('Картка лояльності Marshal')}</Text>
          <TouchableOpacity onPress={closeModal} hitSlop={hitSlop}>
            <Icon name="x" size={24} color={colors.black_000000} />
          </TouchableOpacity>
        </View>
        <Text style={styles.bonusCard}>{bonusCard}</Text>
        <View style={styles.qrCodeContainer}>
          <QRCode
            size={160}
            // FIXME:
            // value={}
          />
        </View>
      </View>
    </Modal>
  );
};

export default BonusCardModal;
