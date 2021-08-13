import React from 'react';
import {useCallback, useTranslation, useRef} from '@hooks';
import {
  View,
  Text,
  Icon,
  Clipboard,
  Toast,
  InviteFriendsInfo,
  UsualButton,
  Alert,
  Share,
} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {hitSlop} from '@constants';

const fakeLink = 'www.xxxxxxxxxxx.xxx/xxxx';

type TProps = {};

const InviteFriends: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();
  const toastRef = useRef(null);

  const onPressShare = useCallback(async () => {
    try {
      const result = await Share.share({
        title: t('Поділіться своїм посиланням'),
        message: fakeLink,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  }, []);

  const onPressCopy = useCallback(() => {
    Clipboard.setString(fakeLink);
    toastRef?.current?.show('Посилання скопійовано', 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Toast
        ref={toastRef}
        style={{backgroundColor: '#EDF1F8'}}
        position="center"
        fadeInDuration={750}
        fadeOutDuration={750}
        opacity={0.8}
        textStyle={{color: '#000000'}}
      />
      <View style={styles.borderViewContainer}>
        <View style={styles.linkContainer}>
          <Text style={styles.referralTitle}>{t('Реферальне посилання')}</Text>
          <Text style={styles.referralValue}>{fakeLink}</Text>
        </View>
        <TouchableOpacity onPress={onPressCopy} hitSlop={hitSlop}>
          <Icon size={24} name="copy" />
        </TouchableOpacity>
      </View>
      <InviteFriendsInfo />
      <View style={styles.buttonContainer}>
        <UsualButton
          title={t('Поділитися посиланням')}
          onPress={onPressShare}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(InviteFriends);
