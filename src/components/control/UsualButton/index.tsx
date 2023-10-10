import React from 'react';
import {useMemo} from '@hooks';
import {
  TouchableOpacity,
  Text,
  LinearGradient,
  ActivityIndicator,
  View,
} from '@components';
import styles from './styles';
import {colors} from '@constants';
import {StyleProp, ViewStyle} from '@types';

type TProps = {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  dark?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: {};
  onPress: () => void;
};

const UsualButton: React.FC<TProps> = ({
  title,
  loading = false,
  disabled = false,
  buttonStyle = {},
  titleStyle = {},
  dark = false,
  onPress,
}) => {
  const gradientColor = useMemo(() => {
    return disabled && !dark
      ? [colors.gray_DADBDF, colors.gray_DADBDF]
      : [colors.gray_363434, colors.black_1E1A1A];
  }, [loading, disabled, dark]);

  return (
    <LinearGradient
      style={[styles.container, buttonStyle]}
      colors={gradientColor}>
      <TouchableOpacity
        style={styles.btnStyle}
        disabled={disabled || loading}
        onPress={onPress}>
        <View>
          {loading ? (
            <ActivityIndicator
              color={
                disabled && !dark ? colors.black_000000 : colors.white_FFFFFF
              }
              size={14}
            />
          ) : (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          )}
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default UsualButton;
