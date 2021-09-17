import React from 'react';
import {Dispatch} from 'redux';
import {useMemo, useTranslation} from '@hooks';
import {View, Text} from '@components';
import {TGlobalState, TSettingsText} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import moment from 'moment';

type TProps = {
  dispatch: Dispatch;
  settings: TSettingsText[];
};

const LoyaltyTerms: React.FC<TProps> = ({dispatch, settings}) => {
  const {t} = useTranslation();

  const data = useMemo(() => {
    return settings.find(item => item.type === 'loyalty_conditions');
  }, [settings]);

  const lastUpdate = useMemo(
    () => moment(data?.updated_at).format('DD.MM.YYYY'),
    [data?.updated_at],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Умови лояльності')}</Text>
      <Text style={styles.description}>{lastUpdate}</Text>
      <Text style={styles.content}>{data?.text}</Text>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  settings: state.settings.data,
});

export default connect(mapStateToProps)(LoyaltyTerms);
