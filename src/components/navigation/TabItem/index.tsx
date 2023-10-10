import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Icon, Text, TouchableOpacity} from '@components';
import {colors} from '@constants';
import {useTranslation, useEffect} from '@hooks';

import styles from './styles';

type TProps = {
  onPressHandler: () => void;
  iconName: string;
  isActive: boolean;
  title: string;
  hasBadge?: boolean;
};

const TabItem: React.FC<TProps> = ({
  onPressHandler,
  iconName,
  isActive,
  title,
  hasBadge,
}) => {
  const scaleAnimValue = useSharedValue(isActive ? 1.5 : 1);
  const translateYAnimValue = useSharedValue(isActive ? -4 : 0);

  const translateBadgeY = useSharedValue(isActive ? -4 : 0);
  const translateBadgeX = useSharedValue(isActive ? 4 : 0);

  const {t} = useTranslation();

  const animatedIconContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: translateYAnimValue.value},
        {scale: scaleAnimValue.value},
      ],
    };
  });

  const animatedBadgeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: translateBadgeY.value},
        {translateX: translateBadgeX.value},
      ],
    };
  });
  useEffect(() => {
    translateYAnimValue.value = withTiming(isActive ? -4 : 0);
    scaleAnimValue.value = withTiming(isActive ? 1.5 : 1);
    if (hasBadge) {
      translateBadgeY.value = withTiming(isActive ? -4 : 0);
      translateBadgeX.value = withTiming(isActive ? 4 : 0);
    }
  }, [isActive, hasBadge]);

  return (
    <TouchableOpacity
      disabled={isActive}
      style={styles.container}
      onPress={onPressHandler}>
      {hasBadge ? (
        <Animated.View style={[styles.badge, animatedBadgeStyle]} />
      ) : null}
      <Animated.View style={animatedIconContainerStyle}>
        <Icon
          name={iconName}
          size={24}
          color={isActive ? colors.red_D61920 : colors.black_58585B}
        />
      </Animated.View>

      <Text style={[styles.title, isActive && styles.titleActive]}>
        {t(title)}
      </Text>
    </TouchableOpacity>
  );
};

export default TabItem;
