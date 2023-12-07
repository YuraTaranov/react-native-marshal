import React from 'react';
import {useTranslation} from '@hooks';
import {View, Text, Image} from '@components';
import styles from './styles';
import {assets} from '@assets';

type TProps = {};

const NothingFoundItem: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={assets.NO_SEARCH} style={styles.image} />
        <Text style={styles.text}>{t('NothingFound')}</Text>
      </View>
    </View>
  );
};

export default NothingFoundItem;
