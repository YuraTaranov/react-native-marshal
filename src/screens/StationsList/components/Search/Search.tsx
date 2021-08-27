import React from 'react';
import {useTranslation, useRef} from '@hooks';
import {View, Icon, TouchableOpacity} from '@components';
import {TextInput} from 'react-native';
import {colors} from '@constants';
import styles from './styles';
import {resetSearchStations, setTextOfSearch} from '@reducers/searchStations';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

type TProps = {
  dispatch: Dispatch;
  textOfSearch: string;
};

const Search: React.FC<TProps> = ({dispatch, textOfSearch}) => {
  const {t} = useTranslation();
  const inputEl = useRef(null);

  const onChangeText = (text: string) => {
    dispatch(setTextOfSearch(text));
  };

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
      dispatch(resetSearchStations());
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
          value={textOfSearch}
          onChangeText={onChangeText}
          allowFontScaling={false}
          autoCorrect={false}
          autoCapitalize="none"
          style={[styles.text, styles.ITView]}
          placeholder={t('Search')}
          placeholderTextColor={colors.gray_2D2D2D}
        />
      </View>
      {textOfSearch ? (
        <TouchableOpacity style={styles.cleanView} onPressIn={onClean}>
          <Icon size={20} name="x" color={colors.black_000000} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default connect()(Search);
