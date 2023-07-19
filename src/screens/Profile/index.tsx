import React from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {Dispatch} from 'redux';

import {
  useEffect,
  useCallback,
  useMemo,
  useTranslation,
  useNavigation,
} from '@hooks';
import {
  View,
  TouchableOpacity,
  Icon,
  GradientBorder,
  ProfileUpdate,
  QuestionButton,
} from '@components';
import {colors, declension, gradients} from '@constants';
import {navigate} from '@services';
import {getCars} from '@reducers/cars';

import styles from './styles';
import {LoyaltyCard, ProfileMenuItem} from './components';

//types
import {TGlobalState, TProfile, TNotification} from '@types';

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

  const menuItems: TMenuItem[] = useMemo(() => {
    return [
      {
        icon: 'edit_profile',
        name: t('Редагувати профіль'),
        onPress: () =>
          navigate('ProfileStack', {
            screen: 'ProfileEdit',
          }),
      },
      {
        icon: 'bell',
        name: t('Історія сповіщень'),
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
      //   {
      //     icon: 'shopping',
      //     name: t('Мої покупки'),
      //     onPress: () =>
      //       navigate('ProfileStack', {
      //         screen: 'Purchases',
      //       }),
      //   },
      {
        icon: 'car',
        name: t('Авто'),
        onPress: () => dispatch(getCars()),
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

  const onPressSettings = useCallback(() => {
    navigate('ProfileStack', {
      screen: 'Settings',
    });
  }, []);

  useEffect(() => {
    setOptions({
      headerLeft: () => <QuestionButton />,
      headerRight: () => (
        <TouchableOpacity onPress={onPressSettings}>
          <Icon size={24} name="settings" color={colors.gray_464649} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}>
      {profile?.card ? <LoyaltyCard profile={profile} /> : null}
      <View style={styles.leftIndent}>
        <GradientBorder colors={gradients.gray} style={styles.gradientBorder} />
        <View style={styles.menuItemsContainer}>
          {menuItems.map(item => (
            <ProfileMenuItem
              item={item}
              newNotificationsLength={newNotificationsLength}
              cardNumber={cardNumber}
              key={item.name}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
  notifications: state.notifications.data,
});

export default connect(mapStateToProps)(Profile);
