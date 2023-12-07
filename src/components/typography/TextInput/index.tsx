import React from 'react';
import {TextInput as TI, TextInputProps} from 'react-native';
import styles from './styles';
import {colors} from '@constants';

const TextInput: React.FC<TextInputProps> = ({style, ...TIProps}) => {
  return <TI placeholderTextColor={colors.black_000000} style={[styles.defaultText, style]} {...TIProps} />;
};

export default TextInput;
