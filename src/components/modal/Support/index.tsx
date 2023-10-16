import React from 'react';
import {useCallback, useTranslation} from '@hooks';
import {View, Text, TouchableOpacity, Modal, Icon, Image} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {Dispatch} from 'redux';
import {setSupport} from '@reducers/modalController';
import {Direction} from 'react-native-modal';
import {android, colors, ios} from '@constants';
import {Linking} from 'react-native';
import {assets} from '@assets';

type TProps = {
  support: TGlobalState['modalController']['support'];
  dispatch: Dispatch;
};

const swipeDirection:
  | 'down'
  | 'up'
  | 'left'
  | 'right'
  | Direction[]
  | undefined = ['down', 'up'];

const tel = '+38 (080) 050 85 55';
const viberNumberIOS = '%+380508639852';
const viberNumberAndroid = '380508639852';
const telegramUrl = 'tg://resolve?domain=Marshal_azs';

const Support: React.FC<TProps> = ({support, dispatch}) => {
  const {t} = useTranslation();

  const onSwipeCancel = useCallback(() => {
    dispatch(setSupport(false));
  }, []);

  const onPressPhone = useCallback(() => {
    try {
      Linking.openURL(`tel:${tel}`);
    } catch (error) {
      __DEV__ && console.log('onPressPhone error', error);
    }
  }, []);

  const onPressWhatsapp = useCallback(() => {
    try {
      // Linking.openURL(`whatsapp://send?phone=+380508639852`);
      Linking.openURL(`https://api.whatsapp.com/send?phone=380508639852`);
    } catch (error) {
      __DEV__ && console.log('onPressWhatsapp error', error);
    }
  }, []);

  const onPressViber = useCallback(() => {
    try {
      Linking.openURL(
        `viber://chat?number=${ios ? viberNumberIOS : viberNumberAndroid}`,
      ).catch(err => {
        Linking.openURL(
          ios
            ? 'https://apps.apple.com/ru/app/id382617920'
            : 'https://play.google.com/store/apps/details?id=com.viber.voip',
        );
      });
    } catch (error) {
      __DEV__ && console.log(error, 'viber link error');
    }
  }, []);

  const onPressTelegram = useCallback(() => {
    try {
      Linking.openURL(telegramUrl).catch(err => {
        Linking.openURL('http://t.me/Marshal_azs');
      });
    } catch (error) {
      __DEV__ && console.log('onPressTelegram error', error);
    }
  }, []);

  return (
    <Modal
      isVisible={support}
      backdropTransitionOutTiming={0}
      backdropOpacity={0}
      useNativeDriver={android}
      style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.header}
        onPress={onSwipeCancel}
        activeOpacity={1}>
        <Text style={styles.headerText}>{t('Підтримка')}</Text>
        <Icon
          name="x"
          size={24}
          color={colors.gray_464649}
          style={styles.close}
        />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.boldText}>{t('Виникли питання?')}</Text>
        <Text style={styles.boldText}>{t('Ми завжди раді допомогти')}:</Text>
        <Text style={styles.phone} onPress={onPressPhone}>
          {tel}
        </Text>
        <Text style={styles.greyText}>{t('Працюємо з 7:00 до 23:00')}</Text>
        <View style={styles.flexOne} />
        <Text style={styles.supportOnline}>{t('Підтримка онлайн:')}</Text>
        <View style={styles.messengersContainer}>
          <TouchableOpacity
            style={styles.messengerContainer}
            onPress={onPressWhatsapp}>
            <Image style={styles.messengerLogo} source={assets.WHATSAPP} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.messengerContainer}
            onPress={onPressViber}>
            <Image style={styles.messengerLogo} source={assets.VIBER} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.messengerContainer}
            onPress={onPressTelegram}>
            <Image style={styles.messengerLogo} source={assets.TELEGRAM} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  support: state.modalController.support,
});

export default connect(mapStateToProps)(Support);
