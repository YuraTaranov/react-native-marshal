import React from 'react';
import {Dispatch} from 'redux';
import {useMemo, useTranslation} from '@hooks';
import {View, Text} from '@components';
import {TGlobalState, TSettingsText} from '@types';
import {connect} from 'react-redux';
import styles from './styles';

type TProps = {
  dispatch: Dispatch;
  settings: TSettingsText[];
};

const UseTerms: React.FC<TProps> = ({dispatch, settings}) => {
  const {t} = useTranslation();

  const data = useMemo(() => {
    return settings.find(item => item.type === 'terms_of_use');
  }, [settings]);

  // FIXME: дата должна приходить с бэка
  //   const lastUpdate = data?.date
  const lastUpdate = '24.05.2021';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Умови використання')}</Text>
      <Text style={styles.description}>{lastUpdate}</Text>
      <Text style={styles.content}>{data?.text}</Text>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  settings: state.settings.data,
});

export default connect(mapStateToProps)(UseTerms);
