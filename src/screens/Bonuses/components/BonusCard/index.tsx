import React from 'react';
import {ImageBackground} from 'react-native';

import {useTranslation} from '@hooks';
import {View, Text, Image, GradientBorder} from '@components';
import {assets} from '@assets';

import styles from './styles';

//types
import {TProfile} from '@types';

type TProps = {
  count_bonus: TProfile['count_bonus'];
};

const BonusCard: React.FC<TProps> = ({count_bonus}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ImageBackground
          source={assets.CARD_BACKGROUND}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}>
          <View style={styles.logoContainer}>
            <Image
              source={assets.CARD_LOGO}
              style={styles.logo}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cardMainContentContainer}>
            <GradientBorder style={styles.gradientBorder} />
            <View style={styles.bonusContainer}>
              <Text style={styles.bonusValue}>{`${count_bonus || 0}`}</Text>
              <Text style={[styles.bonusValue, styles.bonusValueRegular]}>{`${t(
                'балів',
              )}`}</Text>
            </View>
            <GradientBorder style={styles.gradientBorder} />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default BonusCard;
