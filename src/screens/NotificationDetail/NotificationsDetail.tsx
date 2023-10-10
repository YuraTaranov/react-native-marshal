import React from 'react';
import moment from 'moment';

import {useMemo, useTranslation, useRoute} from '@hooks';
import {View, Text, StatusBar, UsualButton, ScrollView} from '@components';
import {goBack} from '@services';
import {colors} from '@constants';

import styles from './styles';

//types
import {NotificationDetailRouteProp, TNotification} from '@types';
type TProps = {
  notificationData: TNotification;
};

const NotificationsDetail: React.FC<TProps> = () => {
  const {
    t,
    i18n: {language},
  } = useTranslation();
  const {params} = useRoute<NotificationDetailRouteProp>();

  const {title, message, date} = params;

  const formatDateAndTime = useMemo(() => {
    return {
      date: moment(new Date(date), 'MM.YYYY')
        .locale(language)
        .format('DD MMMM'),
      time: moment(new Date(date), 'HH:mm').locale(language).format('HH:mm'),
    };
  }, [date, language, t]);

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

export default NotificationsDetail;
