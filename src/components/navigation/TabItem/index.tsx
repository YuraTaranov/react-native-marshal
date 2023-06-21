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
};

const TabItem: React.FC<TProps> = ({
  onPressHandler,
  iconName,
  isActive,
  title,
}) => {
  const scaleAnimValue = useSharedValue(isActive ? 1.5 : 1);
  const translateYAnimValue = useSharedValue(isActive ? -12 : 0);
  const {t} = useTranslation();

  const animatedIconContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: translateYAnimValue.value},
        {scale: scaleAnimValue.value},
      ],
    };
  });

  useEffect(() => {
    translateYAnimValue.value = withTiming(isActive ? -12 : 0);
    scaleAnimValue.value = withTiming(isActive ? 1.5 : 1);
  }, [isActive]);

  return (
    <TouchableOpacity
      disabled={isActive}
      style={styles.container}
      onPress={onPressHandler}>
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
