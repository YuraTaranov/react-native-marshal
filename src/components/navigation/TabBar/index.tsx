import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, Icon, SafeAreaView} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {colors} from '@constants';
import {i18n} from '@services';

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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        disabled={generalIndex === 0}
        style={styles.eachScreen}
        onPress={jump('Stations')}>
        <Icon
          name={generalIndex === 0 ? 'station_active' : 'station'}
          size={24}
          color={generalIndex === 0 ? colors.green_00AE36 : colors.gray_2D2D2D}
        />
        <Text style={[styles.text, generalIndex === 0 && styles.textActive]}>
          {i18n.t('Наші АЗК')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={generalIndex === 1}
        style={styles.eachScreen}
        onPress={jump('Promotions')}>
        <Icon
          name={generalIndex === 1 ? 'promotion_active' : 'promotion'}
          size={24}
          color={generalIndex === 1 ? colors.green_00AE36 : colors.gray_2D2D2D}
        />
        <Text style={[styles.text, generalIndex === 1 && styles.textActive]}>
          {i18n.t('Акції')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={generalIndex === 2}
        style={styles.eachScreen}
        onPress={jump('Home')}>
        <Icon
          name={generalIndex === 2 ? 'home_active' : 'home'}
          size={24}
          color={generalIndex === 2 ? colors.green_00AE36 : colors.gray_2D2D2D}
        />
        <Text style={[styles.text, generalIndex === 2 && styles.textActive]}>
          {i18n.t('Головна')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={generalIndex === 3}
        style={styles.eachScreen}
        onPress={jump('Bonuses')}>
        <Icon
          name={generalIndex === 3 ? 'bonus_active' : 'bonus'}
          size={24}
          color={generalIndex === 3 ? colors.green_00AE36 : colors.gray_2D2D2D}
        />
        <Text style={[styles.text, generalIndex === 3 && styles.textActive]}>
          {i18n.t('Бонуси')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={generalIndex === 4}
        style={styles.eachScreen}
        onPress={jump('Profile')}>
        <Icon
          name={generalIndex === 4 ? 'profile_active' : 'profile'}
          size={24}
          color={generalIndex === 4 ? colors.green_00AE36 : colors.gray_2D2D2D}
        />
        <Text style={[styles.text, generalIndex === 4 && styles.textActive]}>
          {i18n.t('Профіль')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(TabBar);
