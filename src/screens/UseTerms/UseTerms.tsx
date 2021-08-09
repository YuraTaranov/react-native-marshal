import React from 'react';
import {Dispatch} from 'redux';
import {
  useEffect,
  useCallback,
  useMemo,
  useTranslation,
  useState,
} from '@hooks';
import {View, Text} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';

type TProps = {
  dispatch: Dispatch;
};

const UseTerms: React.FC<TProps> = ({dispatch}) => {
  const {t} = useTranslation();

  const lastUpdate = '24.05.2021';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Умови використання')}</Text>
      <Text style={styles.description}>
        {/* FIXME: */}
        {lastUpdate}
      </Text>
      <Text style={styles.content}>
        {/* FIXME: */}
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
      </Text>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  // reducer: state.reducer
});

export default connect(mapStateToProps)(UseTerms);
