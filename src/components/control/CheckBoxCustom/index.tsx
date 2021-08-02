import React from 'react';
import {View, CheckBox, TouchableOpacity} from '@components';
import styles from './styles';
import {colors, hitSlop} from '@constants';
import {useMemo, useCallback} from '@hooks';

const CheckBoxCustom: React.FC<TProps> = ({
  value = false,
  toggleValue,
  text,
  disabled,
}) => {
  const changeValue = useCallback(() => toggleValue(!value), [value]);

  const tintColors = useMemo(() => {
    return {true: colors.gray_2D2D2D, false: colors.gray_2D2D2D};
  }, []);

  return (
    <View style={styles.checkBoxContainer}>
      <CheckBox
        value={value}
        onValueChange={toggleValue}
        boxType="square"
        tintColor={colors.gray_2D2D2D}
        lineWidth={1}
        onCheckColor={colors.white_FFFFFF}
        onFillColor={colors.gray_2D2D2D}
        onTintColor={colors.gray_2D2D2D}
        animationDuration={0.3}
        onAnimationType="fade"
        offAnimationType="fade"
        style={styles.checkBox}
        tintColors={tintColors}
        disabled={disabled}
      />
      <TouchableOpacity onPress={changeValue} hitSlop={hitSlop}>
        {text}
      </TouchableOpacity>
    </View>
  );
};

export default CheckBoxCustom;

type TProps = {
  value: boolean;
  toggleValue: (value: boolean) => void;
  text: JSX.Element;
  disabled?: boolean;
};
