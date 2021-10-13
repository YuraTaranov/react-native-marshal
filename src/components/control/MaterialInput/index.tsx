import React from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  ViewStyle,
} from 'react-native';
import {FilledTextField, TextField} from 'rn-material-ui-textfield';
import {useMemo} from '@hooks';
import {colors, hitSlop} from '@constants';
import styles from './styles';
import {Icon} from '@components';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MaterialInput: React.FC<TProps> = ({
  onFocus,
  onBlur,
  onChangeText,
  onSubmit,
  onRef,
  activeLineWidth = 2,
  baseColor = colors.gray_8D909D,
  disabled,
  error,
  formatText,
  inputContainerStyle,
  textColor = colors.black_000000,
  keyboardType = 'default',
  label,
  lineWidth = 2,
  maxLength,
  onPressAccessory,
  prefix,
  renderRightAccessory,
  returnKeyType = 'done',
  rightAccessoryColor = colors.black_000000,
  rightAccessoryName,
  tintColor,
  value,
}) => {
  const rightAccessory = useMemo(() => {
    if (renderRightAccessory && rightAccessoryName) {
      return () => (
        <TouchableOpacity
          onPress={onPressAccessory}
          hitSlop={hitSlop}
          activeOpacity={1}
          style={styles.accessoryContainer}>
          <Icon
            name={rightAccessoryName}
            size={24}
            color={rightAccessoryColor}
          />
        </TouchableOpacity>
      );
    }
  }, [renderRightAccessory, rightAccessoryName, rightAccessoryColor]);

  return (
    <FilledTextField
      ref={onRef}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      onChangeText={onChangeText}
      label={label}
      keyboardType={keyboardType}
      onSubmitEditing={onSubmit}
      maxLength={maxLength}
      labelTextStyle={styles.lableStyle}
      style={{...styles.textInputStyle, color: textColor}}
      tintColor={tintColor ? tintColor : colors.black_000000}
      baseColor={baseColor}
      lineWidth={lineWidth}
      disabledLineWidth={0.5}
      disabledLineType="solid"
      activeLineWidth={activeLineWidth}
      inputContainerStyle={{
        ...styles.inputContainerStyle,
        ...inputContainerStyle,
      }}
      labelFontSize={12}
      renderRightAccessory={rightAccessory}
      returnKeyType={returnKeyType}
      formatText={formatText}
      prefix={prefix}
      disabled={disabled}
      error={error}
    />
  );
};

export default MaterialInput;

type TProps = {
  value: string | number | null | undefined;
  onChangeText?: (value: string) => void;
  onRef?: (ref: TextField) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmit?: () => void;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  renderRightAccessory?: JSX.Element | boolean;
  rightAccessoryName?: string;
  rightAccessoryColor?: string;
  onPressAccessory?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  secureTextEntry?: boolean;
  maxLength?: number;
  formatText?: (value: string) => string;
  inputContainerStyle?: ViewStyle;
  lineWidth?: number;
  activeLineWidth?: number;
  textColor?: string;
  baseColor?: string;
  prefix?: string;
  disabled?: boolean;
  error?: string;
  tintColor?: string;
};
