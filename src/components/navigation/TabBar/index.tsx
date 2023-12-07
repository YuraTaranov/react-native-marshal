import React from 'react';
import {connect} from 'react-redux';

import {DeviceInfo, View} from '@components';
import {useCallback, useMemo} from '@hooks';

import TabItem from '../TabItem';
import styles from './styles';

//types
import {TGlobalState} from '@types';

type TProps = {
  navigation: any;
  state: any;
  lang: TGlobalState['appGlobalState']['lang'];
  count: number;
};

const TabBar: React.FC<TProps> = ({navigation, state, count, lang}) => {
  const generalIndex: number = state?.index || 0;

  const jump = useCallback(
    (routeName: string) => () => navigation.jumpTo(routeName),
    [],
  );

  const hasNewNotifications = useMemo(() => count > 0, [count]);

  const style = useMemo(() => {
    const name = DeviceInfo.getModel();
    const devices = [
      'iPhone 15',
      'iPhone 15 Plus',
      'iPhone 15 Pro',
      'iPhone 15 Pro Max',
    ];
    return !devices.includes(name) ? {marginBottom: 32} : styles.marginBottom;
  }, []);

  return (
    <View style={[styles.container, {...style}]}>
      <TabItem
        isActive={generalIndex === 0}
        title={'Наші АЗК'}
        lang={lang}
        onPressHandler={jump('Stations')}
        iconName={generalIndex === 0 ? 'station-3' : 'station-2'}
      />
      <TabItem
        isActive={generalIndex === 1}
        title={'Знижки'}
        lang={lang}
        onPressHandler={jump('Promotions')}
        iconName={generalIndex === 1 ? 'promotion-3' : 'promotion-2'}
      />
      <TabItem
        isActive={generalIndex === 2}
        title={'Головна'}
        lang={lang}
        onPressHandler={jump('Home')}
        iconName={generalIndex === 2 ? 'home-3' : 'home-2'}
      />
      <TabItem
        isActive={generalIndex === 3}
        title={'Акції'}
        lang={lang}
        onPressHandler={jump('Bonuses')}
        iconName={generalIndex === 3 ? 'gift-3' : 'gift-2'}
      />
      <TabItem
        isActive={generalIndex === 4}
        title={'Профіль'}
        lang={lang}
        onPressHandler={jump('Profile')}
        iconName={generalIndex === 4 ? 'profile-3' : 'profile-2'}
        hasBadge={hasNewNotifications}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  count: state.notifications.count,
  lang: state.appGlobalState.lang,
});

export default connect(mapStateToProps)(TabBar);
