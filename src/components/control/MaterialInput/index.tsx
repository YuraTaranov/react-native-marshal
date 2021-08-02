import React from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  ViewStyle,
} from 'react-native';
import {FilledTextField, TextField} from 'rn-material-ui-textfield';
import {useMemo} from '@hooks';
import {colors} from '@constants';
import styles from './styles';
import {Icon} from '@components';

const MaterialInput: React.FC<TProps> = ({
  value,
  onFocus,
  onChangeText,
  onSubmit,
  onRef,
  label,
  keyboardType = 'default',
  renderRightAccessory,
  returnKeyType = 'done',
  rightAccessoryName,
  maxLength,
  formatText,
  inputContainerStyle,
  disabled,
  error,
}) => {
  const rightAccessory = useMemo(() => {
    if (renderRightAccessory && rightAccessoryName) {
      return () => (
        <Icon name={rightAccessoryName} size={24} color={colors.black_000000} />
      );
    }
  }, [renderRightAccessory, rightAccessoryName]);

  return (
    <FilledTextField
      ref={onRef}
      onFocus={onFocus}
      value={value}
      onChangeText={onChangeText}
      label={label}
      keyboardType={keyboardType}
      onSubmitEditing={onSubmit}
      maxLength={maxLength}
      labelTextStyle={styles.lableStyle}
      style={styles.textInputStyle}
      tintColor={colors.black_000000}
      baseColor={colors.gray_8D909D}
      lineWidth={2}
      activeLineWidth={2}
      inputContainerStyle={{
        ...styles.inputContainerStyle,
        ...inputContainerStyle,
      }}
      labelFontSize={12}
      renderRightAccessory={rightAccessory}
      returnKeyType={returnKeyType}
      formatText={formatText}
      disabled={disabled}
      error={error}
    />
  );
};

export default MaterialInput;

type TProps = {
  value: string;
  onChangeText?: (value: string) => void;
  onRef?: (ref: TextField) => void;
  onFocus?: () => void;
  onSubmit?: () => void;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  renderRightAccessory?: JSX.Element | boolean;
  rightAccessoryName?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  secureTextEntry?: boolean;
  maxLength?: number;
  formatText?: (value: string) => string;
  inputContainerStyle?: ViewStyle;
  baseColor?: string;
  disabled?: boolean;
  error?: string;
};
