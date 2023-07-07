import React from 'react';

import {GradientBorder, Text, TouchableOpacity} from '@components';
import {gradients} from '@constants';
import {useTranslation} from '@hooks';

import styles from './styles';

type TProps = {
  onPressHandler: () => void;
};

const InviteButton: React.FC<TProps> = ({onPressHandler}) => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity onPress={onPressHandler} style={styles.container}>
      <GradientBorder colors={gradients.gray} />
      <Text style={styles.title}>{t('Запросити друзів')}</Text>
      <GradientBorder colors={gradients.gray} />
    </TouchableOpacity>
  );
};

export default InviteButton;
