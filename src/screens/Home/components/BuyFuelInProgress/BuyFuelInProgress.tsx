import React from 'react';
import {useTranslation} from '@hooks';
import {View, Text, Modal, TouchableOpacity, Icon, Image} from '@components';
import styles from './styles';
import {colors, hitSlop} from '@constants';
import {assets} from '@assets';

type TProps = {
  isVisible: boolean;
  closeModal: () => void;
};

const BuyFuelInProgress: React.FC<TProps> = ({isVisible, closeModal}) => {
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
          <TouchableOpacity onPress={closeModal} hitSlop={hitSlop}>
            <Icon name="x" size={24} color={colors.black_000000} />
          </TouchableOpacity>
        </View>
        <Image
          source={assets.BUY_FUEL_IN_PROGRESS}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{t('Функція у розробці')}</Text>
      </View>
    </Modal>
  );
};

export default BuyFuelInProgress;
