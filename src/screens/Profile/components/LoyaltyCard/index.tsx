import React from 'react';
import {Animated, ImageBackground} from 'react-native';

import {useTranslation, useState, useMemo} from '@hooks';
import {View, Text, TouchableOpacity, QRCode, Image} from '@components';
import {assets} from '@assets';

import styles from './styles';

//types
import {TProfile} from '@types';

type TProps = {
  profile: TProfile;
};

const LoyaltyCard: React.FC<TProps> = ({profile}) => {
  const {t} = useTranslation();
  const {name, surname} = profile;

  const [flipped, setFlipped] = useState(false);
  const animationValue = useState(new Animated.Value(0))[0];

  const cardNumber = useMemo(() => {
    if (profile?.card) {
      return String(profile.card)
        .replace(/\D/, '')
        .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
    } else {
      return '';
    }
  }, [profile?.card]);

  const flipCard = () => {
    setFlipped(!flipped);
    Animated.spring(animationValue, {
      toValue: flipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = animationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '180deg'],
  });

  const backInterpolate = animationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['180deg', '90deg', '0deg'],
  });

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };

  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  const userCardName = useMemo(
    () => `${name ?? ''} ${surname ?? surname}`,
    [name, surname],
  );

  const renderFront = () => (
    <View>
      <Animated.View
        style={[styles.card, styles.frontCard, frontAnimatedStyle]}>
        <ImageBackground
          source={assets.CARD_BACKGROUND}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}>
          <View style={styles.fingerprintContainer}>
            <Image
              source={assets.FINGERPRINT}
              style={styles.fingerprint}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity
            onPress={flipCard}
            style={styles.logoContainer}
            activeOpacity={1}>
            <Image
              source={assets.CARD_LOGO}
              style={styles.logo}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View style={styles.contentContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{userCardName}</Text>
            </View>
            <View style={styles.cardNumberContainer}>
              <Text style={styles.cardNunber}>{`${cardNumber}`}</Text>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );

  const renderBack = () => (
    <View>
      <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
        <View style={styles.fingerprintContainer}>
          <Image
            source={assets.FINGERPRINT}
            style={styles.fingerprint}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.bonusCardNumber}>{t('Карта лояльності')}</Text>
        {profile?.card ? (
          <>
            <Text style={{...styles.bonusCardNumber, marginTop: 4}}>
              {cardNumber}
            </Text>
            <View style={styles.qrCodeContainer}>
              <QRCode
                size={120}
                value={`${profile?.card}`}
                backgroundColor="transparent"
              />
            </View>
          </>
        ) : null}
      </Animated.View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderBack()}
      {renderFront()}
    </View>
  );
};

export default LoyaltyCard;
