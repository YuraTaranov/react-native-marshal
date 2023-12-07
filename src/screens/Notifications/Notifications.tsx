import React, {useState} from 'react';
import {useEffect, useCallback, useTranslation, useNavigation} from '@hooks';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Icon,
  Image,
  RefreshControl,
  ActivityIndicator,
} from '@components';
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
import {
  getNotifications,
  setFinishedGetNotifications,
  setLazyLoadingNotifications,
  setLoadingNotifications,
  setNotificationsRefresh,
} from '@reducers/notifications';

type TProps = {
  dispatch: any;
  notifications: TNotification[];
  loading: boolean;
  finishedGetNotifications: boolean;
  lazyLoading: boolean;
  isRefresh: boolean;
  count: number;
};

const Notifications: React.FC<TProps> = ({
  notifications,
  dispatch,
  loading,
  finishedGetNotifications,
  lazyLoading,
  isRefresh,
  count,
}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    PushNotification.removeAllDeliveredNotifications();
    ios && PushNotificationIOS.setApplicationIconBadgeNumber(0);
  }, []);

  useEffect(() => {
    dispatch(getNotifications(page));
    return () => {
      dispatch(setLoadingNotifications(true));
    };
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

  const onEndReached = useCallback(() => {
    if (!lazyLoading && !finishedGetNotifications) {
      dispatch(setLazyLoadingNotifications(true));
      const newPage = page + 1;
      setPage(newPage);
      dispatch(getNotifications(newPage));
    }
  }, [page, lazyLoading, finishedGetNotifications]);

  const onRefresh = async () => {
    dispatch(setFinishedGetNotifications(false));
    dispatch(setNotificationsRefresh(true));
    setPage(1);
    dispatch(getNotifications(1));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'red'} />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.red_D61920]}
              tintColor={colors.red_D61920}
              size={24}
              refreshing={isRefresh}
              onRefresh={onRefresh}
            />
          }
          initialNumToRender={20}
          maxToRenderPerBatch={18}
          onEndReachedThreshold={1.5}
          windowSize={20}
          onEndReached={onEndReached}
          data={notifications}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  notifications: state.notifications.data,
  loading: state.notifications.loading,
  finishedGetNotifications: state.notifications.finishedGetNotifications,
  lazyLoading: state.notifications.lazyLoading,
  isRefresh: state.notifications.isRefresh,
  count: state.notifications.count,
});

export default connect(mapStateToProps)(Notifications);
