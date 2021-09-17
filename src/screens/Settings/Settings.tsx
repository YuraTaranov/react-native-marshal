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
} from '@components';
import {TGlobalState, TBiometricsType} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '@constants';
import {navigate} from '@services';
import {logout} from '@reducers/logout';
import BioAuthSwitch from './components/BioAuthSwitch/BioAuthSwitch';
import LanguageModal from './components/LanguageModal/LanguageModal';

type TProps = {
  dispatch: Dispatch;
  biometricsType: TBiometricsType;
};

type TMenuItem = {
  name: string;
  onPress: () => void;
};

const Settings: React.FC<TProps> = ({dispatch, biometricsType}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const [languageModalVisible, setLanguageModalVisible] =
    useState<boolean>(false);

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

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPressLogout}>
          <Icon size={24} name="logout" color={colors.white_FFFFFF} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const menuItems: TMenuItem[] = useMemo(() => {
    return [
      {
        name: t('Геопозиція'),
        onPress: () => OpenAppSettings.open(),
      },
      {
        name: t('Сповіщення'),
        onPress: () => navigate('NotificationSettings'),
      },
      {
        name: t('Про додаток'),
        onPress: () => navigate('AboutApp'),
      },
      {
        name: t('Умови лояльності'),
        onPress: () => navigate('LoyaltyTerms'),
      },
      {
        name: t('Умови використання'),
        onPress: () => navigate('UseTerms'),
      },
      {
        name: t('Мова'),
        onPress: () => onPressLang(),
      },
    ];
  }, []);

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
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <LanguageModal
        isVisible={languageModalVisible}
        closeModal={closeLangModal}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  biometricsType: state.biometrics.biometricsType,
});

export default connect(mapStateToProps)(Settings);
