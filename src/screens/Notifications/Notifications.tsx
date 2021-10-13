import React from 'react';
import {Dispatch} from 'redux';
import {useEffect, useCallback, useTranslation, useNavigation} from '@hooks';
import {View, Text, FlatList, TouchableOpacity, Icon, Image} from '@components';
import {TGlobalState, TNotification} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '@constants';
import {navigate} from '@services';
import moment from 'moment';
import {setNotifications} from '@reducers/notifications';
import {animation} from '@helpers';
import {getPromotion} from '@reducers/promotion';
import {assets} from '@assets';

type TProps = {
  dispatch: Dispatch;
  notifications: TNotification[];
};

const Notifications: React.FC<TProps> = ({dispatch, notifications}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();

  const onPressSettings = useCallback(() => {
    navigate('Settings');
  }, []);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPressSettings}>
          <Icon size={24} name="settings" color={colors.white_FFFFFF} />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const hasUnread = notifications.find(item => !item.isRead);
      if (hasUnread) {
        const notificationsRead = notifications.map(item => {
          return {...item, isRead: true};
        });
        animation();
        dispatch(setNotifications(notificationsRead));
      }
    }, 5000);
  }, [notifications]);

  const onPressNotification = useCallback(
    item => () => {
      if (item.type === 'action') dispatch(getPromotion(item.data_id));
    },
    [],
  );

  const getDate = useCallback((item: Date) => {
    const date = moment(item).format('DD.MM.YYYY');
    const time = moment(item).format('HH:MM');
    return `${date} ${time}`;
  }, []);

  const renderItem: ({item}: {item: TNotification}) => JSX.Element =
    useCallback(
      ({item}) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={onPressNotification(item)}
          disabled={item.type === 'text'}>
          <View>
            <Icon size={24} color={colors.black_000000} name="bell" />
            {!item.isRead ? <View style={styles.newMessageCircle} /> : null}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text style={styles.date}>{getDate(item.date)}</Text>
          </View>
          {item.type === 'action' ? (
            <Icon size={24} name="right" color={colors.black_000000} />
          ) : null}
        </TouchableOpacity>
      ),
      [],
    );

  const keyExtractor: (item: TNotification) => string = useCallback(
    item => String(item.id),
    [],
  );

  const ListEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Image source={assets.NO_NOTIFICATIONS} style={styles.emptyImage} />
        <Text style={styles.emptyTitle}>{t('Нових сповіщень немає')}</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  notifications: state.notifications.data,
});

export default connect(mapStateToProps)(Notifications);
