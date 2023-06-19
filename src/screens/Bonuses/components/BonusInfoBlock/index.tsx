import React from 'react';

import {GradientBorder, LinearGradient, Text, View} from '@components';
import {useTranslation} from '@hooks';
import {gradients} from '@constants';

import styles from './styles';

//types
import {TProfile} from '@types';

type TProps = {
  count_bonus: TProfile['count_bonus'];
  count_spent_bonus: TProfile['count_spent_bonus'];
};

const BonusInfoBlock: React.FC<TProps> = ({count_bonus, count_spent_bonus}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <GradientBorder colors={gradients.gray} style={styles.gradientBorder} />
      <View style={styles.contentContainer}>
        <View style={styles.blockContainer}>
          <Text style={styles.blockTitle}>{t('Активні бонуси')}</Text>
          <View style={styles.blockValueContainer}>
            <Text style={styles.blockValue}>{count_bonus || 0}</Text>
          </View>
        </View>
        <LinearGradient
          colors={gradients.gray}
          style={styles.gradientSeparate}
        />
        <View style={styles.blockContainer}>
          <Text style={styles.blockTitle}>{t('Використано')}</Text>
          <View style={styles.blockValueContainer}>
            <Text style={styles.blockValue}>{count_spent_bonus || 0}</Text>
          </View>
        </View>
      </View>
      <GradientBorder colors={gradients.gray} style={styles.gradientBorder} />
    </View>
  );
};

export default BonusInfoBlock;
