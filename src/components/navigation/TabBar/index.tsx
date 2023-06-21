import React, {useCallback} from 'react';
import {connect} from 'react-redux';

import {View} from '@components';

import TabItem from '../TabItem';
import styles from './styles';

//types
import {TGlobalState} from '@types';

type TProps = {
  navigation: any;
  state: any;
};

const TabBar: React.FC<TProps> = ({navigation, state}) => {
  const generalIndex: number = state?.index || 0;

  const jump = useCallback(
    (routeName: string) => () => navigation.jumpTo(routeName),
    [],
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
        title={'Акції'}
        onPressHandler={jump('Promotions')}
        iconName={generalIndex === 1 ? 'station-3' : 'station-2'}
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
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(TabBar);

{
  /* <TouchableOpacity
        disabled={generalIndex === 0}
        style={styles.eachScreen}
        onPress={jump('Stations')}>
        <Icon
          name={generalIndex === 0 ? 'station-3' : 'station-2'}
          size={generalIndex === 0 ? 24 : 24}
          color={generalIndex === 0 ? colors.red_D61920 : colors.black_58585B}
        />
        <Text style={[styles.text, generalIndex === 0 && styles.textActive]}>
          {t('Наші АЗК')}
        </Text>
      </TouchableOpacity> */
}
{
  /* <TouchableOpacity
        disabled={generalIndex === 1}
        style={styles.eachScreen}
        onPress={jump('Promotions')}>
        <Icon
          name={generalIndex === 1 ? 'promotion-3' : 'promotion-2'}
          size={generalIndex === 1 ? 24 : 24}
          color={generalIndex === 1 ? colors.red_D61920 : colors.black_58585B}
        />
        <Text style={[styles.text, generalIndex === 1 && styles.textActive]}>
          {t('Акції')}
        </Text>
      </TouchableOpacity> */
}
{
  /* <TouchableOpacity
        disabled={generalIndex === 2}
        style={styles.eachScreen}
        onPress={jump('Home')}>
        <Icon
          name={generalIndex === 2 ? 'home-3' : 'home-2'}
          size={generalIndex === 2 ? 24 : 24}
          color={generalIndex === 2 ? colors.red_D61920 : colors.black_58585B}
        />
        <Text style={[styles.text, generalIndex === 2 && styles.textActive]}>
          {t('Головна')}
        </Text>
      </TouchableOpacity> */
}
{
  /* <TouchableOpacity
        disabled={generalIndex === 3}
        style={styles.eachScreen}
        onPress={jump('Bonuses')}>
        <Icon
          name={generalIndex === 3 ? 'gift-3' : 'gift-2'}
          size={generalIndex === 3 ? 24 : 24}
          color={generalIndex === 3 ? colors.red_D61920 : colors.black_58585B}
        />
        <Text style={[styles.text, generalIndex === 3 && styles.textActive]}>
          {t('Бонуси')}
        </Text>
      </TouchableOpacity> */
}
{
  /* <TouchableOpacity
        disabled={generalIndex === 4}
        style={styles.eachScreen}
        onPress={jump('Profile')}>
        <Icon
          name={generalIndex === 4 ? 'profile-3' : 'profile-2'}
          size={generalIndex === 4 ? 24 : 24}
          color={generalIndex === 4 ? colors.red_D61920 : colors.black_58585B}
        />
        <Text style={[styles.text, generalIndex === 4 && styles.textActive]}>
          {t('Профіль')}
        </Text>
      </TouchableOpacity> */
}
