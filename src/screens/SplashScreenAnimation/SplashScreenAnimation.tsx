import React from 'react';
import {useCallback, useRef, useEffect} from '@hooks';
import {View, Image} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {replace} from '@services';
import {Animated, Easing} from 'react-native';
import {assets} from '@assets';
import {width} from '@constants';

type TProps = {};

const SplashScreenAnimation: React.FC<TProps> = ({}) => {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const linesAnim = useRef(new Animated.Value(0)).current;

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
    replace('RootStackNavigator');
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{...styles.logoContainer, opacity: logoAnim}}>
        <Image source={assets.LOGO} style={styles.logo} />
      </Animated.View>
      <Animated.View style={{width: linesAnim}}>
        <View style={styles.whiteLine} />
        <View style={styles.redLine} />
      </Animated.View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(SplashScreenAnimation);
