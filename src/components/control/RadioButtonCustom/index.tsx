import React from 'react';
import {useCallback, useMemo} from '@hooks';
import {View, TouchableOpacity, Text} from '@components';
import styles from './styles';
import {hitSlop} from '@constants';

type TProps = {
  text: string;
  active: boolean;
  onChange: (value: any) => void;
  type: number;
};

const RadioButtonCustom: React.FC<TProps> = ({
  text,
  type,
  active,
  onChange,
}) => {
  const onPress = useCallback(() => {
    onChange({type, name: text});
  }, [type, text]);

  const radioStyle = useMemo(() => {
    return {
      ...styles.radioButton,
      borderWidth: active ? 8 : 1,
    };
  }, [active]);

  return (
    <TouchableOpacity
      style={styles.radioContainer}
      onPress={onPress}
      hitSlop={hitSlop}>
      <View style={radioStyle} />
      <Text style={styles.radioText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RadioButtonCustom;
