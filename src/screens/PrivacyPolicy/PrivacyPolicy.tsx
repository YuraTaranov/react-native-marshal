import React from 'react';

import {Text, ScrollView, Linking} from '@components';
import {useCallback} from '@hooks';
import {privacyPolicy, privacyPolicySupportPhone} from '@constants';

import styles from './styles';

type TProps = {};

const PrivacyPolicy: React.FC<TProps> = () => {
  const onPressCall = useCallback(() => {
    Linking.openURL(`tel:0800508555`);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.description}>
        {privacyPolicy}
        <Text style={styles.link} onPress={onPressCall}>
          {privacyPolicySupportPhone}
        </Text>
        .
      </Text>
    </ScrollView>
  );
};

export default PrivacyPolicy;
