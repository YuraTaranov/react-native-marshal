import React from 'react';
import {Dispatch} from 'redux';
import {
  useEffect,
  useMemo,
  useTranslation,
  useState,
  useNavigation,
} from '@hooks';
import {View, Text, DeviceInfo, Alert, Linking} from '@components';
import {TGlobalState, TSettingsText} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import VersionCheck from 'react-native-version-check';
import RenderHtml from 'react-native-render-html';
import {Dimensions} from 'react-native';

type TProps = {
  dispatch: Dispatch;
  settings: TSettingsText[];
};

const AboutApp: React.FC<TProps> = ({dispatch, settings}) => {
  const {t} = useTranslation();
  const [isNeedUpdate, setIsNeedUpdate] = useState<boolean>(false);
  const [storeUrl, setStoreUrl] = useState<string>('');
  const appVersion = DeviceInfo.getVersion();
  const {setOptions} = useNavigation();

  VersionCheck.needUpdate()
    .then(async (res: any) => {
      if (res?.isNeeded) {
        setStoreUrl(res.storeUrl);
        setIsNeedUpdate(true);
      }
    })
    .catch((err: any) => console.log('VersionCheck error', err));

  useEffect(() => {
    setOptions({
      title: data?.title,
    });
  }, []);

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
  }, [isNeedUpdate, t]);

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
      {data ? (
        <RenderHtml
          contentWidth={Dimensions.get('screen').width}
          source={{html: data.text_html}}
        />
      ) : null}
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  settings: state.settings.data,
});

export default connect(mapStateToProps)(AboutApp);
