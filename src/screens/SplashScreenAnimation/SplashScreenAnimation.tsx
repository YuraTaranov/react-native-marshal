import React from 'react';
import {useCallback} from '@hooks';
import {View, LottieView} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {navigate} from '@services';

type TProps = {};

const SplashScreenAnimation: React.FC<TProps> = ({}) => {
  const onAnimationFinish = useCallback(() => {
    navigate('RootStackNavigator');
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottie}
        source={require('./animation_splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
        speed={0.5}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(SplashScreenAnimation);
