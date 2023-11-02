import React, {useEffect} from 'react';
import {
  useMemo,
  useTranslation,
  useLayoutEffect,
  useNavigation,
  useRoute,
} from '@hooks';
import {View, Text, PromotionView, moment, ScrollView} from '@components';
import {
  PromotionRouteProp,
  TGlobalState,
  TNotification,
  TPromotion,
} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import 'moment/locale/uk';
import 'moment/locale/ru';
import {Dispatch} from 'redux';
import {animation} from '@helpers';
import {setNotifications} from '@reducers/notifications';

type TProps = {
  dispatch: Dispatch;
  notifications: TNotification[];
  promotion: TPromotion;
  language: string;
};

const Promotion: React.FC<TProps> = ({
  promotion,
  language,
  dispatch,
  notifications,
}) => {
  const {t} = useTranslation();
  language === 'ru' ? moment.locale('ru') : moment.locale('uk');
  const {setOptions} = useNavigation();
  const {params} = useRoute<PromotionRouteProp>();

  useLayoutEffect(() => {
    setOptions({
      title:
        promotion.type === 'action'
          ? t('Акція')
          : promotion.type === 'discount'
          ? t('Знижка')
          : t('Новина'),
    });
  }, [promotion.type, t]);

  useEffect(() => {
    if (params && !params.isRead && params.id) {
      const notificationsActuality = notifications.map(item => {
        return {...item, isRead: item.id === params.id ? true : item.isRead};
      });
      animation('ios');
      dispatch(setNotifications(notificationsActuality));
    }
  }, []);

  const dateTime = useMemo(() => {
    return `${
      promotion?.type === 'action' ? t('Акція до') : t('Знижка до')
    } ${moment(promotion?.end).format('LL').slice(0, -2)}`;
  }, [promotion.end, promotion?.type, t]);

  return (
    <View style={styles.container}>
      <PromotionView disabled={true} item={promotion} />
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>{promotion?.title}</Text>
        <Text style={styles.description}>{promotion?.text}</Text>
        {promotion.type !== 'new' ? (
          <Text style={styles.date}>{dateTime}</Text>
        ) : null}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  promotion: state.promotion.data,
  notifications: state.notifications.data,
  language: state.appGlobalState.lang,
});

export default connect(mapStateToProps)(Promotion);
