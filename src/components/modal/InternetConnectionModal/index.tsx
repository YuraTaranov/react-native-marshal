import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {useTranslation} from '@hooks';
import {View, Text, Image, Modal, LinearGradient} from '@components';
import {assets} from '@assets';
import {gradients} from '@constants';

import styles from './styles';

type TProps = {
  dispatch: Dispatch;
  isConnected: boolean;
};

const LOCATIONS = [0.1, 0.2, 0.7];

const InternetConnectionModal: React.FC<TProps> = ({dispatch, isConnected}) => {
  const {t} = useTranslation();

  return (
    <Modal
      isVisible={!isConnected}
      style={styles.container}
      backdropTransitionOutTiming={0}>
      <LinearGradient
        colors={gradients.red}
        locations={LOCATIONS}
        style={styles.gradient}>
        <View style={styles.noInternetContainer}>
          <View style={styles.noInternetTitleContainer}>
            <Text style={styles.noInternetTitle}>
              {t('Проблеми з мережею Інтернет')}
            </Text>
          </View>
          <View style={styles.noInternetImageContainer}>
            <Image
              source={assets.NO_CONNECTION}
              style={styles.noInternetImage}
            />
          </View>
          <View style={styles.noInternetDescriptionContainer}>
            <Text style={styles.noInternetDescription}>
              {t(`Будь ласка перевірте підключення до інтерету`)}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  isConnected: state.network.isConnected,
});

export default connect(mapStateToProps)(InternetConnectionModal);
