import React from 'react';
import {useTranslation} from '@hooks';
import {Text, View} from '@components';
import styles from './styles';
import {Image} from 'react-native';

type TProps = {
  image: any;
  title: string;
};

const Item: React.FC<TProps> = ({image, title}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode={'contain'} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t(title)}</Text>
      </View>
    </View>
  );
};

export default Item;
