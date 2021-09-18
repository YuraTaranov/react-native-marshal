/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck this disables checks for the file
import React from 'react';

import {googleGeocodingKey, colors, ios} from '@constants';
import {
  Geolocation,
  GooglePlacesAutocomplete,
  Icon,
  Text,
  TouchableOpacity,
  View,
} from '../../';

import {SVG_Icons} from '@assets';
import {animation} from '@helpers';
import {connect} from 'react-redux';
import {useRef, useState, useEffect, useTranslation} from '@hooks';
import styles from './styles';
import stylesWithRoute from './stylesWithRoute';
import RightMyButton from './RightMyButton';
import LeftMyButton from './LeftMyButton';
import Label from './Label';

//TYPE
import {
  GooglePlaceData,
  GooglePlaceDetail,
  TFullGeoPoint,
  TGlobalState,
} from '@types';

type TLang = 'uk' | 'ua' | 'ru' | 'en';

type TProps = {
  cb: (obj: TFullGeoPoint) => void;
  label: string;
  lang: TLang;
  placeholder: string;
  placeholderTextColor: string;
  showMyPositionButton?: boolean;
  setRoute: boolean;
};

type TQuery = {
  key: string;
  language: TLang;
  components?: string;
};

const getLang = (lang: TLang) => (lang === 'uk' ? 'ua' : lang);
const Autocomplete: React.FC<TProps> = ({
  cb,
  label,
  lang,
  placeholder,
  placeholderTextColor,
  showMyPositionButton,
  setRoute,
}) => {
  const ref = useRef(null);
  const {t} = useTranslation();
  const [inputText, setText] = useState('');
  const [refresh, setRefresh] = useState(new Date().toString());
  const [useCurrentPosition, setUseCurrentPosition] = useState(false);

  const query: TQuery = {
    key: googleGeocodingKey,
    language: lang,
    components: 'country:ua',
  };

  const onFail = (e: any) => {
    // eslint-disable-next-line no-alert
    alert(t('SearchError'));
    console.log('onFail', e);
  };

  const onNotFound = () => {
    // eslint-disable-next-line no-alert
    alert(t('NotDefined'));
  };

  useEffect(() => {
    query.language = lang;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position?.coords;
        if (latitude && longitude) {
          cb({
            latitude,
            longitude,
            isCurrentPosition: true,
            description: t('isCurrentPosition'),
            place_id: null,
          });
          setUseCurrentPosition(true);

          if (typeof ref?.current?.clear === 'function') {
            ref.current?.clear();
          }

          if (typeof ref?.current?.blur === 'function') {
            ref.current?.blur();
          }
        }
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const onPress = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
  ) => {
    const {place_id, description} = data;
    if (details?.geometry?.location) {
      const {lat = 0, lng = 0} = details.geometry.location;
      cb({
        latitude: +lat,
        longitude: +lng,
        description,
        place_id,
        isCurrentPosition: false,
      });

      if (useCurrentPosition) {
        setUseCurrentPosition(false);
      }
    }
  };

  const onClean = (event: any) => {
    ref.current?.clear();
    setRefresh(new Date().toString());
    cb(null);
  };

  const Backspace = (event: any) => {
    if (event.nativeEvent.key === 'Backspace') {
      cb(inputText.slice(0, -1));
    }
  };

  return (
    <View styles={styles.container}>
      <GooglePlacesAutocomplete
        key={refresh}
        ref={ref}
        editable={false}
        query={query}
        placeholder={placeholder}
        onFail={onFail}
        onNotFound={onNotFound}
        fetchDetails
        enablePoweredByContainer={false}
        predefinedPlacesAlwaysVisible
        onPress={onPress}
        renderRightButton={() =>
          setRoute ? null : (
            <RightMyButton
              onPress={getCurrentLocation}
              onClear={onClean}
              showMyPositionButton={!!showMyPositionButton}
              showMyClearButton={!!inputText}
            />
          )
        }
        renderLeftButton={() =>
          setRoute ? (
            <LeftMyButton onPress={getCurrentLocation} showMyPositionButton />
          ) : null
        }
        minLength={3}
        styles={setRoute ? {...stylesWithRoute} : {...styles}}
        textInputProps={{
          onChangeText: (text: string) => setText(text),
          onKeyPress: Backspace,
          placeholderTextColor,
          editable: !setRoute,
          clearButtonMode: 'never',
          clearTextOnFocus: true,
          multiline: false,
          numberOfLines: 1,
          dataDetectorTypes: 'address',
          enablesReturnKeyAutomatically: true,
          multiline: true,
        }}
      />
      {!setRoute && (!!inputText || useCurrentPosition) && (
        <Label title={label} />
      )}
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  lang: state.appGlobalState.lang,
});

export default connect(mapStateToProps)(Autocomplete);
