import React from 'react';
import {useEffect, useCallback, useTranslation, useNavigation} from '@hooks';
import {View, Text, FlatList, TouchableOpacity, Icon, Image} from '@components';
import {TGlobalState, TNotification} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors, ios} from '@constants';
import {navigate} from '@services';
import moment from 'moment';
import {assets} from '@assets';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {getPromotion} from '@reducers/promotion';

type TProps = {
  dispatch: any;
  notifications: TNotification[];
};

const Notifications: React.FC<TProps> = ({notifications, dispatch}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  useEffect(() => {
    PushNotification.removeAllDeliveredNotifications();
    ios && PushNotificationIOS.setApplicationIconBadgeNumber(0);
  }, []);

  const onPressNotification = useCallback(
    item => () => {
      if (item.type === 'text') {
        navigate('NotificationsDetail', item);
      } else {
        dispatch(getPromotion({id: item.data_id, item}));
      }
    },
    [],
  );

  const getDate = useCallback((item: Date) => {
    const date = moment(item).format('DD.MM.YYYY');
    const time = moment(item).format('HH:mm');
    return `${date} ${time}`;
  }, []);

  const renderItem: ({item}: {item: TNotification}) => JSX.Element =
    useCallback(
      ({item}) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={onPressNotification(item)}>
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
          {item.type !== 'text' ? (
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
        <Text style={styles.emptyTitle}>{t('Сповіщень немає')}</Text>
      </View>
    );
  }, [t]);

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
