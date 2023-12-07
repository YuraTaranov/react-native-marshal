import React from 'react';
import {useTranslation} from '@hooks';
import {View, Text, Image} from '@components';
import styles from './styles';
import {assets} from '@assets';

const ListEmptyComponent: React.FC = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={assets.NO_PURCHASES} />
        <Text style={styles.title}>{t('Даних ще немає')}</Text>
      </View>
    </View>
  );
};

export default ListEmptyComponent;
