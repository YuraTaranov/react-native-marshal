/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {googleGeocodingKey} from '@constants';
import {
  Geolocation,
  GooglePlacesAutocomplete,
  View,
  Alert,
  Geocoder,
} from '@components';
import {connect} from 'react-redux';
import {useRef, useState, useEffect, useTranslation, useCallback} from '@hooks';
import styles from './styles';
import RightMyButton from './RightMyButton';
import Label from './Label';

//TYPE
import {
  GooglePlaceData,
  GooglePlaceDetail,
  TGlobalState,
  TGeoPoint,
} from '@types';
import {setArrivalPoint, setDeparturePoint} from '@reducers/fuelCalculator';
import {Dispatch} from 'redux';

type TLang = 'uk' | 'ua' | 'ru' | 'en';

type TProps = {
  cb: (obj: TGeoPoint) => void;
  label: string;
  lang: TLang;
  placeholder: string;
  placeholderTextColor: string;
  showMyPositionButton?: boolean;
  textInputValue: string;
  setTextInputValue: (data: any) => {
    data: any;
    type: string;
  };
  type: 'arrival' | 'departure';
  dispatch: Dispatch;
};

type TQuery = {
  key: string;
  language: TLang;
  components?: string;
};

const Autocomplete: React.FC<TProps> = ({
  cb,
  label,
  lang,
  placeholder,
  placeholderTextColor,
  showMyPositionButton,
  textInputValue,
  setTextInputValue,
  dispatch,
  type,
}) => {
  Geocoder.init(googleGeocodingKey, {language: lang});
  const ref = useRef(null);
  const {t} = useTranslation();
  const [refresh, setRefresh] = useState(new Date().toString());
  const [myLocationLoading, setMyLocationLoading] = useState<boolean>(false);

  const query: TQuery = {
    key: googleGeocodingKey,
    language: lang,
    components: 'country:ua',
  };

  const onFail = (e: any) => {
    Alert.alert(t('SearchError'));
  };

  const onNotFound = () => {
    Alert.alert(t('NothingFound'));
  };

  useEffect(() => {
    query.language = lang;
  }, [lang]);

  const getMyLocationAddress = useCallback((lat, lng) => {
    Geocoder.from(lat, lng)
      .then(json => {
        const address = json?.results[0]?.formatted_address;
        if (address) {
          type === 'arrival'
            ? dispatch(setArrivalPoint(address))
            : dispatch(setDeparturePoint(address));
          setMyLocationLoading(false);
        } else {
          Alert.alert('', t('Неможливо визначити ваше місце розташування'));
        }
      })
      .catch(error => console.warn(error));
  }, []);

  const getCurrentLocation = () => {
    setMyLocationLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position?.coords;
        if (latitude && longitude) {
          cb({
            latitude,
            longitude,
            place_id: undefined,
          });
          getMyLocationAddress(latitude, longitude);
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
    dispatch(setTextInputValue(description));
    if (details?.geometry?.location) {
      const {lat = 0, lng = 0} = details.geometry.location;
      cb({
        latitude: +lat,
        longitude: +lng,
        place_id,
      });
    }
  };

  const onClean = (event: any) => {
    ref.current?.clear();
    setRefresh(new Date().toString());
    cb(null);
  };

  const onChangeText = useCallback(value => {
    dispatch(setTextInputValue(value));
  }, []);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        key={refresh}
        ref={ref}
        query={query}
        placeholder={placeholder}
        onFail={onFail}
        onNotFound={onNotFound}
        fetchDetails
        enablePoweredByContainer={false}
        predefinedPlacesAlwaysVisible
        onPress={onPress}
        renderRightButton={() => (
          <RightMyButton
            onPress={getCurrentLocation}
            onClear={onClean}
            showMyPositionButton={!!showMyPositionButton}
            showMyClearButton={!!textInputValue}
            loading={myLocationLoading}
          />
        )}
        minLength={3}
        styles={styles}
        textInputProps={{
          value: textInputValue,
          onChangeText: onChangeText,
          placeholderTextColor,
          editable: true,
          clearButtonMode: 'never',
          clearTextOnFocus: false,
          multiline: false,
          numberOfLines: 1,
          dataDetectorTypes: 'address',
          enablesReturnKeyAutomatically: true,
        }}
      />
      {!!textInputValue && <Label title={label} />}
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  lang: state.appGlobalState.lang,
});

export default connect(mapStateToProps)(Autocomplete);
