import React from 'react';

import {View, ProfileUpdate} from '@components';

import styles from './styles';

type TProps = {};

const ProfileEdit: React.FC<TProps> = ({}) => {
  return (
    <View style={styles.container}>
      <ProfileUpdate isRegistration={false} />
    </View>
  );
};

export default ProfileEdit;
