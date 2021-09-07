export type TGeoPoint = {
  latitude: number;
  longitude: number;
  isCurrentPosition?: boolean;
  description?: string;
  place_id?: string;
} | null;

export type TFullGeoPoint = TGeoCoordinates | null;

export type {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';

export type TPath = 'start' | 'end';

export type TGeoCoordinates = {
  start: TGeoPoint;
  end: TGeoPoint;
};

export type TPropsForRouteUrl = {
  startLatitude: number | string;
  startLongitude: number | string;
  endLatitude: number | string;
  endLongitude: number | string;
};

export type TTextValue = {
  text: string;
  value: number;
};

export type TLatLong = {
  lat: number;
  lng: number;
};

export type TLegs = {
  distance: TTextValue;
  duration: TTextValue;
  end_address: string;
  end_location: TLatLong;
  start_address: string;
  start_location: TLatLong;
};

export type TRoute = {
  legs: TLegs[];
  summary: string;
  waypoint_order: [];
};
