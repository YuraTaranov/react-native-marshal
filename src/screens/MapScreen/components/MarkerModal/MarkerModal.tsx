import React from 'react';
import {useCallback, useTranslation, useState, useEffect} from '@hooks';
import {
  Geolocation,
  Icon,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from '@components';
import {MarkerButton} from '..';
import styles from './styles';
import {colors} from '@constants';
import {getUrlForRoute, openAppSettings} from '@helpers';

//Type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TMarker} from '../../MapScreen';
import {navigate} from '@services';

type TProps = {
  cb: Function;
  data: TMarker;
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isGPS: boolean;
};

export const MarkerModal: React.FC<TProps> = ({
  isVisible,
  setVisible,
  data,
  isGPS,
  cb,
}) => {
  const {t} = useTranslation();

  const closeModal = useCallback(() => {
    cb(null);
    setVisible(false);
  }, [cb]);

  const openingRoute = useCallback(() => {
    if (data) {
      Geolocation.getCurrentPosition(
        position => {
          const urlForRoute = getUrlForRoute({
            startLatitude: position?.coords?.latitude || 0,
            startLongitude: position?.coords?.longitude || 0,
            endLatitude: data?.latitude,
            endLongitude: data?.longitude,
          });
          Linking.openURL(urlForRoute);
        },
        error => {
          console.log(error.code, error.message);
          openAppSettings();
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
    cb(null);
    setVisible(false);
  }, [cb, data]);

  const showDetails = useCallback(() => {
    if (data) {
      setVisible(false);
      navigate('StationsStack', {
        screen: 'MarkerDetail',
        params: {
          markerId: data.id,
          isGPS,
        },
      });
    }
  }, [cb, data]);

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeInUp"
      onBackdropPress={closeModal}
      backdropTransitionOutTiming={0}
      backdropColor="#0000">
      <View style={styles.container}>
        <View style={styles.inContainer}>
          <View style={styles.titleView}>
            <Text style={styles.textTitle}>{data?.name || ''}</Text>
          </View>
          {data?.address && (
            <View style={styles.addressView}>
              <View style={[styles.location]}>
                <Icon name="pin" size={28} color={colors.black_1E1A1A} />
              </View>
              <View style={styles.addressTextView}>
                <Text style={styles.textaddress}>{data.address}</Text>
              </View>
            </View>
          )}
          <View style={styles.buttonsView}>
            <MarkerButton
              iconName="station"
              label={t('Details')}
              onPress={showDetails}
            />
            <View style={styles.divider} collapsable={false} />
            <MarkerButton
              iconName="route"
              label={t('Route')}
              onPress={openingRoute}
              black
            />
          </View>
          <TouchableOpacity onPress={closeModal} style={[styles.eject]}>
            <Icon name="x" size={24} color={colors.black_1E1A1A} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
