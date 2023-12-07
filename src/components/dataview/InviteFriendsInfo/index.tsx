import React from 'react';
import {useTranslation} from '@hooks';
import {View, Text} from '@components';
import styles from './styles';

type TProps = {};

const InviteFriendsInfo: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <View style={styles.stepNumberContainerOuter}>
          <View style={styles.stepNumberContainerInner}>
            <Text style={styles.stepNumberValue}>{1}</Text>
          </View>
        </View>
        <Text style={styles.stepText}>{t('Запросіть друзів')}</Text>
      </View>
      <View style={styles.stepContainer}>
        <View style={styles.stepNumberContainerOuter}>
          <View style={styles.stepNumberContainerInner}>
            <Text style={styles.stepNumberValue}>{2}</Text>
          </View>
        </View>
        <Text style={styles.stepText}>
          {t('Отримайте 50 балів за кожного активного друга')}
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <View style={styles.stepNumberContainerOuter}>
          <View style={styles.stepNumberContainerInner}>
            <Text style={styles.stepNumberValue}>{3}</Text>
          </View>
        </View>
        <Text style={styles.stepText}>{t('Витрачайте бали на покупки')}</Text>
      </View>
    </View>
  );
};

export default InviteFriendsInfo;
