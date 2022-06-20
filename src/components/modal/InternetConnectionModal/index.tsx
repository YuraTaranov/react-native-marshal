import React from 'react';
import {useTranslation} from '@hooks';
import {View, Text, Image, Modal} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {assets} from '@assets';

type TProps = {
  dispatch: Dispatch;
  isConnected: boolean;
};

const InternetConnectionModal: React.FC<TProps> = ({dispatch, isConnected}) => {
  const {t} = useTranslation();

  return (
    <Modal
      isVisible={!isConnected}
      style={styles.container}
      backdropTransitionOutTiming={0}>
      <View style={styles.noInternetContainer}>
        <Text style={styles.noInternetTitle}>
          {t('Проблеми з мережею Інтернет')}
        </Text>
        <Image source={assets.NO_INTERNET} style={styles.noInternetImage} />
        <Text style={styles.noInternetDescription}>
          {t(`Будь ласка перевірте з'єднання з Інтернетом`)}
        </Text>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  isConnected: state.network.isConnected,
});

export default connect(mapStateToProps)(InternetConnectionModal);
