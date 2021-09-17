import React from 'react';
import {useTranslation, useMemo} from '@hooks';
import {View, Modal, Text, Icon, TouchableOpacity, QRCode} from '@components';
import styles from './styles';
import {colors, hitSlop} from '@constants';
import {connect} from 'react-redux';
import {TGlobalState, TProfile} from '@types';

type TProps = {
  isVisible: boolean;
  closeModal: () => void;
  profile: TProfile;
};

const BonusCardModal: React.FC<TProps> = ({isVisible, closeModal, profile}) => {
  const {t} = useTranslation();

  const cardNumber = useMemo(() => {
    if (!!profile?.card) {
      return String(profile.card)
        .replace(/\D/, '')
        .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
      // .replace(/(\d{4})(\d{6})/, '$1 $2');
    } else return '';
  }, [profile?.card]);

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
        {profile?.card ? (
          <Text style={styles.bonusCard}>{cardNumber}</Text>
        ) : null}
        <View style={styles.qrCodeContainer}>
          <QRCode size={160} value={profile?.card || ''} />
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
});

export default connect(mapStateToProps)(BonusCardModal);
