import React from 'react';
import {useCallback, useRef, useEffect, useState, useTranslation} from '@hooks';
import {View, Image, Text} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {replace} from '@services';
import {Animated, Easing} from 'react-native';
import {assets} from '@assets';
import {width} from '@constants';

type TProps = {
  isConnected: boolean;
};

const SplashScreenAnimation: React.FC<TProps> = ({isConnected}) => {
  const {t} = useTranslation();
  const logoAnim = useRef(new Animated.Value(0)).current;
  const linesAnim = useRef(new Animated.Value(0)).current;
  const [animationFinished, setAnimationFinished] = useState<boolean>(false);

  useEffect(() => {
    if (animationFinished && isConnected) {
      replace('RootStackNavigator');
    }
  }, [animationFinished, isConnected]);

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      delay: 400,
    }).start();

    Animated.timing(linesAnim, {
      toValue: width,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start(onAnimationFinish);
  }, [logoAnim, linesAnim]);

  const onAnimationFinish = useCallback(() => {
    setAnimationFinished(true);
  }, []);

  return (
    <View style={styles.container}>
      {!isConnected && animationFinished ? (
        <View style={styles.noInternetContainer}>
          <Text style={styles.noInternetTitle}>
            {t('Проблеми з мережею Інтернет')}
          </Text>
          <Image source={assets.NO_INTERNET} style={styles.noInternetImage} />
          <Text style={styles.noInternetDescription}>
            {t(`Будь ласка перевірте з'єднання з Інтернетом`)}
          </Text>
        </View>
      ) : (
        <>
          <Animated.View style={{...styles.logoContainer, opacity: logoAnim}}>
            <Image source={assets.LOGO} style={styles.logo} />
          </Animated.View>
          <Animated.View style={{width: linesAnim}}>
            <View style={styles.whiteLine} />
            <View style={styles.redLine} />
          </Animated.View>
        </>
      )}
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  isConnected: state.network.isConnected,
});

export default connect(mapStateToProps)(SplashScreenAnimation);
