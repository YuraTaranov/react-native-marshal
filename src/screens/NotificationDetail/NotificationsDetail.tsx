import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {useMemo, useTranslation, useRoute, useEffect} from '@hooks';
import {View, Text, StatusBar, UsualButton, ScrollView} from '@components';
import {goBack} from '@services';
import {colors} from '@constants';
import {animation} from '@helpers';
import {
  readNotifications,
  setNotifications,
  setNotificationsCount,
} from '@reducers/notifications';
import styles from './styles';
import {NotificationDetailRouteProp, TGlobalState, TNotification} from '@types';

type TProps = {
  dispatch: Dispatch;
  notifications: TNotification[];
  count: number;
};

const NotificationsDetail: React.FC<TProps> = ({
  dispatch,
  notifications,
  count,
}) => {
  const {
    t,
    i18n: {language},
  } = useTranslation();
  const {params} = useRoute<NotificationDetailRouteProp>();

  const {title, message, date, isRead, id} = params;

  const formatDateAndTime = useMemo(() => {
    return {
      date: moment(date).format('DD MMMM'),
      time: moment(date).format('HH:mm'),
    };
  }, [date, language, t]);

  useEffect(() => {
    if (!isRead) {
      dispatch(readNotifications(id));
      animation('ios');
    }
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.dark_red_7C2022} animated />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.timeDateText}>
          {formatDateAndTime.date} {t('at')} {formatDateAndTime.time}
        </Text>
        <Text style={styles.message}>{message}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <UsualButton title={'OK'} onPress={goBack} />
      </View>
    </>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  notifications: state.notifications.data,
  count: state.notifications.count,
});
export default connect(mapStateToProps)(NotificationsDetail);
