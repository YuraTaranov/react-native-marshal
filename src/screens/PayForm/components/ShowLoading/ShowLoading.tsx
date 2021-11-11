import React from 'react';
import {Modal, ActivityIndicator} from '@components';
import styles from './styles';
import {colors} from '@constants';

type TProps = {
  isShowLoading: boolean;
};

const ShowLoading: React.FC<TProps> = ({isShowLoading}) => {
  return (
    <Modal
      animationInTiming={400}
      animationOutTiming={400}
      isVisible={isShowLoading}
      backdropOpacity={0}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
      style={styles.container}>
      <ActivityIndicator size="large" color={colors.green_007E26} />
    </Modal>
  );
};

export default ShowLoading;
