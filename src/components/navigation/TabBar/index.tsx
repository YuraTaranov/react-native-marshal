import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from '@hooks';
import { View, Text } from '@components';
import styles from './styles';
import { connect } from 'react-redux';
import { TGlobalState } from '@types';

type TProps = {
  navigation: any;
  state: any;
};

const TabBar: React.FC<TProps> = ({ navigation, state }) => {
  const { t } = useTranslation();

  const generalIndex: number = state?.index || 0;

  const jump = useCallback((routeName: string) => () => navigation.jumpTo(routeName), []);

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={generalIndex === 0} style={styles.eachScreen} onPress={jump('Stations')}>
        <Text style={[styles.text, generalIndex === 1 && styles.textActive]}>{'Наші АЗК'}</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={generalIndex === 1} style={styles.eachScreen} onPress={jump('Promotions')}>
        <Text style={[styles.text, generalIndex === 2 && styles.textActive]}>{'Акції'}</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={generalIndex === 1} style={styles.eachScreen} onPress={jump('Home')}>
        <Text style={[styles.text, generalIndex === 2 && styles.textActive]}>{'Головна'}</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={generalIndex === 1} style={styles.eachScreen} onPress={jump('Bonuses')}>
        <Text style={[styles.text, generalIndex === 2 && styles.textActive]}>{'Бонуси'}</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={generalIndex === 1} style={styles.eachScreen} onPress={jump('Profile')}>
        <Text style={[styles.text, generalIndex === 2 && styles.textActive]}>{'Профіль'}</Text>
      </TouchableOpacity>
    </View>
  );
};


const mapStateToProps = (state: TGlobalState) => ({

});

export default connect(mapStateToProps)(TabBar);
