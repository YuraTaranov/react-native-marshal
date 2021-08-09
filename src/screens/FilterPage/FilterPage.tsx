import React from 'react';
import {useCallback, useTranslation} from '@hooks';
import {View, Text, TouchableOpacity} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import styles from './styles';
import {navigate, goBack} from '@services';

type TProps = {
  dispatch: Dispatch;
};

const FilterPage: React.FC<TProps> = ({dispatch}) => {
  const {t} = useTranslation();

  const navigateToProfile = useCallback(() => {
    goBack();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={navigateToProfile}>
        <Text>Hide Filter</Text>
      </TouchableOpacity>
      <Text>Filter Screen</Text>
    </View>
  );
};
const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(FilterPage);
