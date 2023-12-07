import React from 'react';
import {useCallback, useTranslation} from '@hooks';
import {View, Text, Image, UsualButton} from '@components';
import styles from './styles';
import {assets} from '@assets';
import {navigate} from '@services';

type TProps = {};

const ListEmptyComponent: React.FC<TProps> = () => {
  const {t} = useTranslation();

  const addCar = useCallback(() => {
    navigate('ProfileStack', {
      screen: 'AddCar',
      params: {},
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={assets.NO_CARS} />
        <Text style={styles.title}>{t('Ви ще не додали жодного авто')}</Text>
        <Text style={styles.description}>
          {t('Ви можете додати до трьох автомобілів')}
        </Text>
      </View>
      <View style={styles.buttonBlock}>
        <UsualButton title={t('Додати авто')} onPress={addCar} />
      </View>
    </View>
  );
};

export default ListEmptyComponent;
