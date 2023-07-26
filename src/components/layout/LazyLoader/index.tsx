import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  interpolateColor,
  withDelay,
  withSequence,
} from 'react-native-reanimated';

import {useEffect} from '@hooks';
import {View} from '@components';

import styles from './styles';

const COLORS = ['white', '#9A1B18'];

const LazyLoader = () => {
  const dot1Progress = useSharedValue(0);
  const dot2Progress = useSharedValue(0);
  const dot3Progress = useSharedValue(0);

  useEffect(() => {
    animateDots();
  }, []);

  const animateDots = () => {
    dot1Progress.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 200}),
        withDelay(600, withTiming(0, {duration: 200})),
      ),
      10,
      true,
    );
    dot2Progress.value = withRepeat(
      withSequence(
        withDelay(200, withTiming(1, {duration: 200})),
        withDelay(400, withTiming(0, {duration: 200})),
      ),
      10,
      true,
    );
    dot3Progress.value = withRepeat(
      withSequence(
        withDelay(400, withTiming(1, {duration: 200})),
        withDelay(200, withTiming(0, {duration: 200})),
      ),
      10,
      true,
    );
  };

  const dot1Style = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(dot1Progress.value, [0, 1], COLORS),
    };
  });

  const dot2Style = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(dot2Progress.value, [0, 1], COLORS),
    };
  });

  const dot3Style = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(dot3Progress.value, [0, 1], COLORS),
    };
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View style={[styles.dot, dot1Style]} />
      <Animated.View style={[styles.dot, dot2Style]} />
      <Animated.View style={[styles.dot, dot3Style]} />
    </View>
  );
};

export default LazyLoader;
