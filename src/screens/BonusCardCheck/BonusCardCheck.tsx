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

const BonusCardCheck: React.FC<TProps> = ({dispatch}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text>BonusCardCheckScreen</Text>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  // reducer: state.reducer
});

export default connect(mapStateToProps)(BonusCardCheck);
