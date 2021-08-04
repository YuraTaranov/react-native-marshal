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
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors, declension} from '@constants';
import {FlatList} from 'react-native-gesture-handler';
import ProfileMenuItem from './components/ProfileMenuItem/ProfileMenuItem';
import {setSupport} from '@reducers/modalController';
import {Dispatch} from 'redux';
import {navigate} from '@services';

type TProps = {
  dispatch: Dispatch;
};

type TMenuItem = {
  icon: string;
  name: string;
  onPress: () => void;
};

const Profile: React.FC<TProps> = ({dispatch}) => {
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
        icon: 'creditcard',
        name: t('Карта лояльності Marshal'),
        onPress: () => openBonusCardModal(),
      },
      {
        icon: 'bell',
        name: t('Сповіщення'),
        onPress: () => navigate('Notifications'),
      },
      {
        icon: 'wallet',
        name: t('Мої картки'),
        onPress: () => navigate('MyCards'),
      },
      {
        icon: 'shopping',
        name: t('Мої покупки'),
        onPress: () => navigate('MyPurchases'),
      },
      {
        icon: 'car',
        name: t('Авто'),
        onPress: () => navigate('Cars'),
      },
      {
        icon: 'edit_profile',
        name: t('Редагувати профіль'),
        onPress: () => navigate('EditProfile'),
      },
    ];
  }, []);

  const newNotificationsLength = useMemo(() => {
    //   FIXME:
    return `${2} ${declension(Number(2), [
      'сповіщення',
      'сповіщення',
      'сповіщень',
    ])}`;
  }, []);

  const onPressSupport = useCallback(() => {
    dispatch(setSupport(true));
  }, []);

  const onPressSettings = useCallback(() => {}, []);

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={onPressSupport}>
          <Icon size={24} name="support" color={colors.white_FFFFFF} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={onPressSettings}>
          <Icon size={24} name="settings" color={colors.white_FFFFFF} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const renderItem: ({item}: {item: TMenuItem}) => JSX.Element = useCallback(
    ({item}) => (
      <ProfileMenuItem
        item={item}
        newNotificationsLength={newNotificationsLength}
      />
    ),
    [],
  );
  const keyExtractor: (item: TMenuItem) => string = useCallback(
    item => item.icon,
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
      />
      <BonusCardModal
        isVisible={bonusCardModelVisible}
        closeModal={closeBonusCardModal}
      />
    </View>
  );
};
const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(Profile);
