import React from 'react';
import {useTranslation} from '@hooks';
import {View, Text} from '@components';
import styles from './styles';

type TProps = {};

const HiddenItem: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('DeleteCreditCard')}</Text>
    </View>
  );
};

export default HiddenItem;
