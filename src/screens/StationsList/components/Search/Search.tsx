import React from 'react';
import {useCallback, useMemo, useTranslation, useState, useRef} from '@hooks';
import {View, Icon, TouchableOpacity} from '@components';
import {TextInput} from 'react-native';
import {colors} from '@constants';
import styles from './styles';

type TProps = {
  onKeyPress: (e: any) => void;
  onClear: () => void;
};

export const Search: React.FC<TProps> = ({onKeyPress, onClear}) => {
  const {t} = useTranslation();
  const inputEl = useRef(null);

  const focusToTextInput = (): void => {
    if (inputEl?.current) {
      //@ts-ignore
      inputEl?.current?.focus();
    }
  };
  const onClean = (): void => {
    if (inputEl?.current) {
      //@ts-ignore
      inputEl?.current?.clear();
      onClear();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPressIn={focusToTextInput}>
      <View style={styles.iconView}>
        <Icon size={25} name="search" color={colors.black_000000} />
      </View>
      <View style={styles.blockInput}>
        <TextInput
          ref={inputEl}
          allowFontScaling={false}
          autoCorrect={false}
          autoCapitalize="none"
          style={[styles.text, styles.ITView]}
          placeholder={t('Search')}
          placeholderTextColor={colors.gray_2D2D2D}
          onKeyPress={onKeyPress}
        />
      </View>
      <TouchableOpacity style={styles.cleanView} onPressIn={onClean}>
        <Icon size={20} name="x" color={colors.gray_8D909D} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
