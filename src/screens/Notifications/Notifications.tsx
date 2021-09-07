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
import {View, Text, FlatList, TouchableOpacity, Icon} from '@components';
import {TGlobalState, TNotification} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '@constants';
import {navigate} from '@services';
import moment from 'moment';

// FIXME: delete
const fakeData = [
  {
    id: 1,
    title:
      'Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod..',
    date: new Date(),
    isRead: false,
  },
  {
    id: 2,
    title:
      'Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod..',
    date: new Date(),
    isRead: false,
  },
  {
    id: 3,
    title:
      'Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod..',
    date: new Date(),
    isRead: true,
  },
  {
    id: 4,
    title:
      'Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod..',
    date: new Date(),
    isRead: true,
  },
];

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
          //   FIXME: как помечать пуши прочитанными?
          // onPress={}
        >
          <View>
            <Icon size={24} color={colors.black_000000} name="bell" />
            {!item.isRead ? <View style={styles.newMessageCircle} /> : null}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{getDate(item.date)}</Text>
          </View>
        </TouchableOpacity>
      ),
      [],
    );

  const keyExtractor: (item: TNotification) => string = useCallback(
    item => String(item.id),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        // data={notifications}
        data={fakeData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  notifications: state.notifications.data,
});

export default connect(mapStateToProps)(Notifications);
