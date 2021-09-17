import React from 'react';
import {useTranslation} from '@hooks';
import {View, Text} from '@components';
import styles from './styles';

type TProps = {};

const NothingFoundItem: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('NothingFound')}</Text>
    </View>
  );
};

export default NothingFoundItem;
