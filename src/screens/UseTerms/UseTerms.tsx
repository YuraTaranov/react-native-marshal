import React from 'react';
import {Dispatch} from 'redux';
import {useMemo, useTranslation, useCallback} from '@hooks';
import {View, Text, TouchableOpacity, Linking} from '@components';
import {TGlobalState, TSettingsText} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import moment from 'moment';
import {hitSlop} from '@constants';

type TProps = {
  dispatch: Dispatch;
  settings: TSettingsText[];
};

// TODO: use terms (need to do on the back)
const text =
  'Умови використання цієї програми детально викладені на сайті мережі АЗС Marshal';
const link = 'http://marshal.ua/rules';

const UseTerms: React.FC<TProps> = ({dispatch, settings}) => {
  const {t} = useTranslation();

  const onPressLink = useCallback(() => {
    Linking.openURL(link);
  }, []);

  const data = useMemo(() => {
    return settings.find(item => item.type === 'terms_of_use');
  }, [settings]);

  const lastUpdate = useMemo(
    () => moment(data?.updated_at).format('DD.MM.YYYY'),
    [data?.updated_at],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Умови використання')}</Text>
      <Text style={styles.description}>{lastUpdate}</Text>
      {/* <Text style={styles.content}>{data?.text}</Text> */}
      <Text style={styles.content}>{text}</Text>
      <TouchableOpacity hitSlop={hitSlop} onPress={onPressLink}>
        <Text style={styles.link}>{link}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  settings: state.settings.data,
});

export default connect(mapStateToProps)(UseTerms);
