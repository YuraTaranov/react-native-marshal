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
import {getUrlForRoute} from '@helpers';

//Type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TMarker} from '../../MapScreen';

type TProps = {
  isVisible: boolean;
  data: TMarker;
  cb: Function;
};

export const MarkerModal: React.FC<TProps> = ({isVisible, data, cb}) => {
  const {t} = useTranslation();
  const [visible, setVisible] = useState(isVisible);

  const closeModal = useCallback(() => {
    cb(null);
    setVisible(false);
  }, [cb]);

  const openingRoute = useCallback(() => {
    if (data) {
      Geolocation.getCurrentPosition(
        position => {
          const urlForROute = getUrlForRoute({
            startLatitude: position?.coords?.latitude || 0,
            startLongitude: position?.coords?.longitude || 0,
            endLatitude: data?.latitude,
            endLongitude: data?.longitude,
          });
          Linking.openURL(urlForROute);
          console.log('POS', urlForROute);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
    cb(null);
    setVisible(false);
  }, [cb, data]);

  const showDetails = useCallback(() => {
    if (data) {
      cb({...data, showDetails: true});
      setVisible(false);
    }
  }, [cb, data]);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  return (
    <Modal
      isVisible={visible}
      animationIn="fadeInUp"
      onBackdropPress={closeModal}
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
            <Icon name="Union" size={17} color={colors.black_1E1A1A} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
