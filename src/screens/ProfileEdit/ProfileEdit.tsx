import React from 'react';
import {SafeAreaView, ProfileUpdate} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';

type TProps = {};

const ProfileEdit: React.FC<TProps> = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileUpdate isRegistration={false} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(ProfileEdit);
