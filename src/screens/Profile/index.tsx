import React from 'react';
import {
  useEffect,
  useCallback,
  useMemo,
  useTranslation,
  useNavigation,
  useState,
} from '@hooks';
import {View, TouchableOpacity, Icon, BonusCardModal} from '@components';
import {TGlobalState, TProfile, TNotification} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors, declension, longScreen} from '@constants';
import {FlatList} from 'react-native-gesture-handler';
import ProfileMenuItem from './components/ProfileMenuItem/ProfileMenuItem';
import {setSupport} from '@reducers/modalController';
import {Dispatch} from 'redux';
import {navigate} from '@services';
import {getCars} from '@reducers/cars';

type TProps = {
  notifications: TNotification[];
  dispatch: Dispatch;
  profile: TProfile;
};

type TMenuItem = {
  icon: string;
  name: string;
  onPress: () => void;
};

const Profile: React.FC<TProps> = ({dispatch, profile, notifications}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  const [bonusCardModelVisible, setBonusCardModelVisible] =
    useState<boolean>(false);

  const openBonusCardModal = useCallback(() => {
    setBonusCardModelVisible(true);
  }, []);

  const closeBonusCardModal = useCallback(() => {
    setBonusCardModelVisible(false);
  }, []);

  const menuItems: TMenuItem[] = useMemo(() => {
    return [
      {
        icon: 'bell',
        name: t('Сповіщення'),
        onPress: () =>
          navigate('ProfileStack', {
            screen: 'Notifications',
          }),
      },
      //   TODO: my cards (buy fuel)
      //   {
      //     icon: 'wallet',
      //     name: t('Мої картки'),
      //     onPress: () =>
      //       navigate('ProfileStack', {
      //         screen: 'MyCards',
      //       }),
      //   },
      {
        icon: 'shopping',
        name: t('Мої покупки'),
        onPress: () =>
          navigate('ProfileStack', {
            screen: 'Purchases',
          }),
      },
      {
        icon: 'car',
        name: t('Авто'),
        onPress: () => dispatch(getCars()),
      },
      {
        icon: 'edit_profile',
        name: t('Редагувати профіль'),
        onPress: () =>
          navigate('ProfileStack', {
            screen: 'ProfileEdit',
          }),
      },
    ];
  }, [t]);

  const cardNumber = useMemo(() => {
    if (profile?.card) {
      return String(profile?.card)
        .replace(/\D/, '')
        .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, 'XXXX XXXX XXXX $4');
      // .replace(/(\d{4})(\d{6})/, 'XXXX $2');
    } else {
      return 'XXXX XXXX XXXX XXXX';
    }
    // } else return 'XXXX XXXXXX';
  }, [profile?.card]);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(item => !item.isRead).length;
  }, [notifications]);

  const newNotificationsLength = useMemo(() => {
    return unreadNotificationsCount
      ? `${unreadNotificationsCount} ${declension(
          Number(unreadNotificationsCount),
          [t('непрочитане'), t('непрочитаних'), t('непрочитаних')],
        )}`
      : null;
  }, [unreadNotificationsCount, t]);

  const onPressSupport = useCallback(() => {
    dispatch(setSupport(true));
  }, []);

  const onPressSettings = useCallback(() => {
    navigate('ProfileStack', {
      screen: 'Settings',
    });
  }, []);

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={onPressSupport}>
          <Icon size={24} name="support" color={colors.black_000000} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={onPressSettings}>
          <Icon size={24} name="settings" color={colors.black_000000} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const renderItem: ({item}: {item: TMenuItem}) => JSX.Element = useCallback(
    ({item}) => (
      <ProfileMenuItem
        item={item}
        newNotificationsLength={newNotificationsLength}
        cardNumber={cardNumber}
      />
    ),
    [newNotificationsLength],
  );
  const keyExtractor: (item: TMenuItem) => string = useCallback(
    item => item.icon,
    [],
  );

  return (
    <View style={styles.container}>
      {profile?.card ? (
        <ProfileMenuItem
          item={{
            icon: 'creditcard',
            name: t('Карта лояльності Marshal'),
            onPress: () => openBonusCardModal(),
          }}
          newNotificationsLength={newNotificationsLength}
          cardNumber={cardNumber}
        />
      ) : null}
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={!longScreen}
      />
      <BonusCardModal
        isVisible={bonusCardModelVisible}
        closeModal={closeBonusCardModal}
      />
    </View>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
  notifications: state.notifications.data,
});

export default connect(mapStateToProps)(Profile);
