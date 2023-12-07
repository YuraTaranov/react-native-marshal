import React, {useEffect, useMemo, useState} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {usePrevious, useTranslation} from '@hooks';
import {View, Text, Image, Modal, LinearGradient, QRCode} from '@components';
import {assets} from '@assets';
import {gradients, sizes} from '@constants';
import styles from './styles';
import {TProfile} from '@types';
import {getInitialData} from '@reducers/profile';
import {setLoader} from '@reducers/appGlobalState';
import {setRefreshing} from '@reducers/promotionsMain';
import {setCardsLoader} from '@reducers/cards';

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
  const [isUnVisible, setUnVisible] = useState<boolean>(isConnected);
  const previousIsConnected = usePrevious(isUnVisible);

  useEffect(() => {
    if (
      isUnVisible &&
      previousIsConnected !== undefined &&
      previousIsConnected === false
    ) {
      dispatch(setRefreshing(true));
      dispatch(setCardsLoader(true));
      // const timer = setTimeout(() => {
      dispatch(getInitialData('connection'));
      // clearTimeout(timer);
      // }, 3000);
    }
  }, [isUnVisible]);

  useEffect(() => {
    setUnVisible(isConnected);
  }, [isConnected]);

  const isProfile = useMemo(() => {
    return profile && !Array.isArray(profile);
  }, [profile]);

  return (
    <Modal
      isVisible={!isUnVisible}
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
