import React from 'react';

import {Text, ScrollView} from '@components';
import {privacyPolicy} from '@constants';

import styles from './styles';

type TProps = {};

const PrivacyPolicy: React.FC<TProps> = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.description}>{privacyPolicy}</Text>
    </ScrollView>
  );
};

export default PrivacyPolicy;
