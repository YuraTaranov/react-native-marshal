import React from 'react';
import {useTranslation, useState, useEffect} from '@hooks';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {ios, isIphoneX} from '@constants';
import {UsualButton, Keyboard} from '@components';

import styles from './styles';

type TProps = {
  onPress: (bool: boolean) => void;
  disabled?: boolean;
};

export const CalculateButton: React.FunctionComponent<TProps> = ({
  onPress,
  disabled = false,
}) => {
  const {t} = useTranslation();
  const [keyboardIsShow, setKeyboardStatus] = useState(false);
  const marginBottomUp = isIphoneX ? 260 : ios ? 190 : 240;
  const marginBottomDown = isIphoneX ? 50 : ios ? 20 : 20;
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {marginBottom: offset.value};
  });

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const Calculate = () => {
    onPress(true);
    offset.value = withSpring(marginBottomDown);
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (keyboardIsShow) {
      offset.value = withSpring(marginBottomUp);
    } else {
      offset.value = withSpring(marginBottomDown);
    }
  }, [keyboardIsShow, marginBottomDown, marginBottomUp, offset]);

  return (
    <Animated.View style={[styles.buttonContainer, animatedStyles]}>
      <UsualButton
        title={t('Calculate')}
        disabled={disabled}
        buttonStyle={styles.usualButton}
        onPress={Calculate}
      />
    </Animated.View>
  );
};
