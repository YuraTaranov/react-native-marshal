import React from 'react';
import {useCallback, useTranslation} from '@hooks';
import {View, Text, TouchableOpacity, Modal, Icon, Image} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {Dispatch} from 'redux';
import {setSupport} from '@reducers/modalController';
import {Direction} from 'react-native-modal';
import {colors} from '@constants';
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

//   FIXME:
const tel = '+38 (050) 123 12 12';

const Support: React.FC<TProps> = ({support, dispatch}) => {
  const {t} = useTranslation();

  const onSwipeCancel = useCallback(() => {
    dispatch(setSupport(false));
  }, []);

  const onPressPhone = useCallback(() => {
    try {
      Linking.openURL(`tel:${tel}`);
    } catch (error) {
      console.log('onPressPhone error', error);
    }
  }, []);

  const onPressMessenger = useCallback(() => {
    //   FIXME:
    try {
      Linking.openURL('http://m.me/sport24live');
    } catch (error) {
      console.log('onPressMessenger error', error);
    }
  }, []);

  const onPressViber = useCallback(() => {
    //   FIXME:
    try {
      const contactNumber = '380937838541';
      /* // contact inf
      Linking.openURL(`viber://contact?number=${contactNumber}`);
      */

      // contact chat
      Linking.openURL(`viber://chat?number=${contactNumber}`);

      /* // -- viber bot
      const ViberChatURI = 'mbzjzWXWGxxMLe14eorwxQ==';
      const YourContext = 'YourContext';
      const YourText = 'YourText';

      if (ViberChatURI) {
        Linking.openURL(
          `viber://pa?chatURI=${ViberChatURI}${
            !!YourContext && '&context=' + YourContext
          }${!!YourText && '&text=' + YourText}`,
        );
      }
      */
    } catch (error) {
      console.log('onPressViber error', error);
    }
  }, []);

  const onPressTelegram = useCallback(() => {
    //   FIXME:
    const url = 'tg://resolve?domain=dmitry_ilchenko';
    try {
      Linking.openURL(url).catch(err => {
        if (err.message === `Unable to open URL: ${url}`) {
          Linking.openURL('http://t.me/dmitry_ilchenko');
        }
      });
    } catch (error) {
      console.log('onPressTelegram error', error);
    }
  }, []);

  return (
    <Modal
      swipeDirection={swipeDirection}
      propagateSwipe={true}
      onSwipeCancel={onSwipeCancel}
      isVisible={support}
      backdropTransitionOutTiming={0}
      backdropOpacity={0}
      useNativeDriver={true}
      style={styles.modalContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('Підтримка')}</Text>
        <Icon
          name="x"
          size={24}
          color={colors.white_FFFFFF}
          style={styles.close}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.boldText}>{t('Виникли питання?')}</Text>
        <Text style={styles.boldText}>{t('Ми завжди раді допомогти:')}</Text>
        <Text style={styles.phone} onPress={onPressPhone}>
          {tel}
        </Text>
        <Text style={styles.greyText}>{t('Працюємо з 7:00 до 23:00')}</Text>
        <View style={styles.flexOne} />
        <Text style={styles.supportOnline}>{t('Підтримка онлайн:')}</Text>
        <View style={styles.messengersContainer}>
          <TouchableOpacity
            style={styles.messengerContainer}
            onPress={onPressMessenger}>
            <Image style={styles.messengerLogo} source={assets.MESSENGER} />
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
