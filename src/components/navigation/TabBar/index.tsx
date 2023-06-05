import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Icon} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {TGlobalState} from '@types';
import {colors} from '@constants';
import {useTranslation} from '@hooks';

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

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={generalIndex === 0}
        style={styles.eachScreen}
        onPress={jump('Stations')}>
        <Icon
          name={generalIndex === 0 ? 'station-3' : 'station-2'}
          size={24}
          color={generalIndex === 0 ? colors.red_D61920 : colors.black_58585B}
        />
        <Text style={[styles.text, generalIndex === 0 && styles.textActive]}>
          {t('Наші АЗК')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={generalIndex === 1}
        style={styles.eachScreen}
        onPress={jump('Promotions')}>
        <Icon
          name={generalIndex === 1 ? 'promotion-3' : 'promotion-2'}
          size={24}
          color={generalIndex === 1 ? colors.red_D61920 : colors.black_58585B}
        />
        <Text style={[styles.text, generalIndex === 1 && styles.textActive]}>
          {t('Акції')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={generalIndex === 2}
        style={styles.eachScreen}
        onPress={jump('Home')}>
        <Icon
          name={generalIndex === 2 ? 'home-3' : 'home-2'}
          size={24}
          color={generalIndex === 2 ? colors.red_D61920 : colors.black_58585B}
        />
        <Text style={[styles.text, generalIndex === 2 && styles.textActive]}>
          {t('Головна')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={generalIndex === 3}
        style={styles.eachScreen}
        onPress={jump('Bonuses')}>
        <Icon
          name={generalIndex === 3 ? 'gift-3' : 'gift-2'}
          size={24}
          color={generalIndex === 3 ? colors.red_D61920 : colors.black_58585B}
        />
        <Text style={[styles.text, generalIndex === 3 && styles.textActive]}>
          {t('Бонуси')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={generalIndex === 4}
        style={styles.eachScreen}
        onPress={jump('Profile')}>
        <Icon
          name={generalIndex === 4 ? 'profile-3' : 'profile-2'}
          size={24}
          color={generalIndex === 4 ? colors.red_D61920 : colors.black_58585B}
        />
        <Text style={[styles.text, generalIndex === 4 && styles.textActive]}>
          {t('Профіль')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(TabBar);
