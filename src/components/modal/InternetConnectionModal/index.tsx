import React, {useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {usePrevious, useTranslation} from '@hooks';
import {View, Text, Image, Modal, LinearGradient, QRCode} from '@components';
import {assets} from '@assets';
import {gradients, sizes} from '@constants';

import styles from './styles';
import {TProfile} from '@types';
import Profile from 'src/AppNavigator/tabNavigatorStacks/Profile';
import {getInitialData} from '@reducers/profile';

type TProps = {
  dispatch: Dispatch;
  isConnected: boolean;
  profile: TProfile;
};

const LOCATIONS = [0.1, 0.2, 0.7];

const InternetConnectionModal: React.FC<TProps> = ({
  dispatch,
  isConnected,
  profile,
}) => {
  const {t} = useTranslation();
  const previousIsConnected = usePrevious(isConnected);

  useEffect(() => {
    if (
      isConnected &&
      previousIsConnected !== undefined &&
      previousIsConnected === false
    ) {
      dispatch(getInitialData('connection'));
    }
  }, [isConnected]);

  console.log('🔥', profile);

  const isProfile = useMemo(() => {
    return profile && !Array.isArray(profile);
  }, [profile]);

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
            {isProfile ? (
              <View style={styles.qrCodeContainer}>
                <QRCode
                  size={sizes.cardHeight / 1.5}
                  value={`${profile?.card || ''}`}
                  backgroundColor="transparent"
                  color="#fff"
                />
              </View>
            ) : (
              <Image
                resizeMode="contain"
                source={assets.NO_CONNECTION}
                style={[styles.noInternetImage]}
              />
            )}
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
  profile: state.profile.data,
});

export default connect(mapStateToProps)(InternetConnectionModal);
