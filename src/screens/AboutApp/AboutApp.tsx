import React from 'react';
import {Dispatch} from 'redux';
import {useEffect, useMemo, useTranslation, useState} from '@hooks';
import {View, Text, DeviceInfo, Alert, Linking} from '@components';
import {TGlobalState, TSettingsText} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import VersionCheck from 'react-native-version-check';

type TProps = {
  dispatch: Dispatch;
  settings: TSettingsText[];
};

const AboutApp: React.FC<TProps> = ({dispatch, settings}) => {
  const {t} = useTranslation();
  const [isNeedUpdate, setIsNeedUpdate] = useState<boolean>(false);
  const [storeUrl, setStoreUrl] = useState<string>('');
  const appVersion = DeviceInfo.getVersion();

  VersionCheck.needUpdate()
    .then(async (res: any) => {
      if (res.isNeeded) {
        setStoreUrl(res.storeUrl);
        setIsNeedUpdate(true);
      }
    })
    .catch((err: any) => console.log('VersionCheck error', err));

  useEffect(() => {
    isNeedUpdate &&
      Alert.alert('', t('Для коректної роботи додатку необхідно оновлення'), [
        {
          text: t('Оновити'),
          onPress: () => Linking.openURL(storeUrl),
          style: 'cancel',
        },
        {text: t('Відміна'), onPress: () => {}, style: 'destructive'},
      ]);
  }, [isNeedUpdate]);

  const data = useMemo(() => {
    return settings.find(item => item.type === 'about_the_application');
  }, [settings]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {`${t('Версія додатку:')} ${appVersion}`}
      </Text>
      <Text style={styles.description}>
        {isNeedUpdate ? t('Доступна версія для оновлення') : null}
      </Text>
      <Text style={styles.content}>{data?.text}</Text>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  settings: state.settings.data,
});

export default connect(mapStateToProps)(AboutApp);
