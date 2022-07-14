import React from 'react';
import {Dispatch} from 'redux';
import {
  useEffect,
  useCallback,
  useMemo,
  useTranslation,
  useState,
  useNavigation,
} from '@hooks';
import {
  View,
  Text,
  TouchableOpacity,
  Icon,
  FlatList,
  OpenAppSettings,
  ConfirmModal,
  Alert,
} from '@components';
import {TGlobalState, TBiometricsType} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '@constants';
import {navigate} from '@services';
import {logout} from '@reducers/logout';
import BioAuthSwitch from './components/BioAuthSwitch/BioAuthSwitch';
import LanguageModal from './components/LanguageModal/LanguageModal';
import {deleteProfile} from '@reducers/profile';

type TProps = {
  dispatch: Dispatch;
  biometricsType: TBiometricsType;
  language: string;
};

type TMenuItem = {
  name: string;
  onPress: () => void;
};

const Settings: React.FC<TProps> = ({dispatch, biometricsType, language}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const [languageModalVisible, setLanguageModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPressLogout}>
          <Icon size={24} name="logout" color={colors.white_FFFFFF} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const onPressLogout = useCallback(() => {
    setLogoutModalVisible(true);
  }, []);

  const closeLogoutModal = useCallback(() => {
    setLogoutModalVisible(false);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(logout());
    setLogoutModalVisible(false);
  }, []);

  const onPressLang = useCallback(() => {
    setLanguageModalVisible(true);
  }, []);

  const closeLangModal = useCallback(() => {
    setLanguageModalVisible(false);
  }, []);

  const deleteAcc = useCallback(() => {
    dispatch(deleteProfile());
  }, []);

  const openDeleteProfileAlert = useCallback(() => {
    Alert.alert('', t('Ви впевнені, що хочете видалити ваш акаунт?'), [
      {
        text: t('Так'),
        onPress: deleteAcc,
        style: 'default',
      },
      {
        text: t('Ні'),
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  }, [t]);

  const menuItems: TMenuItem[] = useMemo(() => {
    return [
      {
        name: t('Геопозиція'),
        onPress: () => OpenAppSettings.open(),
      },
      {
        name: t('Сповіщення'),
        onPress: () =>
          navigate('ProfileStack', {
            screen: 'NotificationSettings',
          }),
      },
      {
        name: t('Про додаток'),
        onPress: () =>
          navigate('ProfileStack', {
            screen: 'AboutApp',
          }),
      },
      //   {
      //     name: t('Умови лояльності'),
      //     onPress: () =>
      //       navigate('ProfileStack', {
      //         screen: 'LoyaltyTerms',
      //       }),
      //   },
      {
        name: t('Умови використання'),
        onPress: () =>
          navigate('ProfileStack', {
            screen: 'UseTerms',
          }),
      },
      {
        name: t('Видалити акаунт'),
        onPress: () => openDeleteProfileAlert(),
      },
    ];
  }, [t]);

  const langValue = useMemo(() => {
    return language === 'uk' ? t('Українська') : t('Російська');
  }, [language, t]);

  const renderItem: ({item}: {item: TMenuItem}) => JSX.Element = useCallback(
    ({item}) => (
      <TouchableOpacity style={styles.itemContainer} onPress={item.onPress}>
        <Text style={styles.name}>{item.name}</Text>
        <Icon name="right" color={colors.black_1E1A1A} size={24} />
      </TouchableOpacity>
    ),
    [],
  );
  const keyExtractor: (item: TMenuItem) => string = useCallback(
    item => String(item.name),
    [],
  );

  return (
    <View style={styles.container}>
      <ConfirmModal
        isVisible={logoutModalVisible}
        closeModal={closeLogoutModal}
        rightButtonOnPress={onLogout}
        title={t('Впевнені, що хочете вийти з акаунта?')}
        rightButtonText={t('Так, вийти')}
        leftButtonText={t('Не зараз')}
      />
      {biometricsType !== 'none' ? <BioAuthSwitch /> : null}
      <TouchableOpacity style={styles.langContainer} onPress={onPressLang}>
        <View>
          <Text style={styles.name}>{t('Мова')}</Text>
          <Text style={styles.langValue}>{langValue}</Text>
        </View>
        <Icon name="right" color={colors.black_1E1A1A} size={24} />
      </TouchableOpacity>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
      />
      <LanguageModal
        isVisible={languageModalVisible}
        closeModal={closeLangModal}
        language={language}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  biometricsType: state.biometrics.biometricsType,
  language: state.appGlobalState.lang,
});

export default connect(mapStateToProps)(Settings);
