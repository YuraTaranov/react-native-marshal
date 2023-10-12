import React from 'react';
import {connect} from 'react-redux';

import {View} from '@components';
import {useCallback, useMemo} from '@hooks';

import TabItem from '../TabItem';
import styles from './styles';

//types
import {TGlobalState} from '@types';

type TProps = {
  navigation: any;
  state: any;
  notifications: TGlobalState['notifications']['data'];
};

const TabBar: React.FC<TProps> = ({navigation, state, notifications}) => {
  const generalIndex: number = state?.index || 0;

  const jump = useCallback(
    (routeName: string) => () => navigation.jumpTo(routeName),
    [],
  );

  const hasNewNotifications = useMemo(
    () => Boolean(notifications.find(item => !item.isRead)),
    [notifications],
  );
  return (
    <View style={styles.container}>
      <TabItem
        isActive={generalIndex === 0}
        title={'Наші АЗК'}
        onPressHandler={jump('Stations')}
        iconName={generalIndex === 0 ? 'station-3' : 'station-2'}
      />
      <TabItem
        isActive={generalIndex === 1}
        title={'Знижки'}
        onPressHandler={jump('Promotions')}
        iconName={generalIndex === 1 ? 'promotion-3' : 'promotion-2'}
      />
      <TabItem
        isActive={generalIndex === 2}
        title={'Головна'}
        onPressHandler={jump('Home')}
        iconName={generalIndex === 2 ? 'home-3' : 'home-2'}
      />
      <TabItem
        isActive={generalIndex === 3}
        title={'Бонуси'}
        onPressHandler={jump('Bonuses')}
        iconName={generalIndex === 3 ? 'gift-3' : 'gift-2'}
      />
      <TabItem
        isActive={generalIndex === 4}
        title={'Профіль'}
        onPressHandler={jump('Profile')}
        iconName={generalIndex === 4 ? 'profile-3' : 'profile-2'}
        hasBadge={hasNewNotifications}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  notifications: state.notifications.data,
});

export default connect(mapStateToProps)(TabBar);
