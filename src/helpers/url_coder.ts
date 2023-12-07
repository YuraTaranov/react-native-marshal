/* eslint-disable @typescript-eslint/no-unused-vars */
import {httpGet, httpPost} from '@services';
import {deviceLanguageAndRegion} from '@services';
import {googleGeocodingKey} from '@constants';
import type {
  TFullGeoPoint,
  TPropsForRouteUrl,
  TGeoCoordinates,
  TRoute,
} from '@types';

const {encode} = require('url-encode-decode');
const lang = deviceLanguageAndRegion?.split('_')[0] || 'en';

export const getUrlForRoute = ({
  startLatitude,
  startLongitude,
  endLatitude,
  endLongitude,
}: TPropsForRouteUrl): string => {
  return `https://www.google.com/maps/dir/?api=1&origin=${startLatitude}%2C${startLongitude}&destination=${endLatitude}%2C${endLongitude}&travelmode=driving&hl=${lang}`;
};

export const getDistanceMatrix = async (geoCoordinates: TFullGeoPoint) => {
  return await httpGet(
    'https://maps.googleapis.com/maps/api/distancematrix/json',
    {
      origins: `${
        !!geoCoordinates?.start?.place_id &&
        encode(geoCoordinates.start?.place_id)
      }, ${geoCoordinates?.start?.latitude}, ${
        geoCoordinates?.start?.longitude
      }`,
      destinations: `${
        !!geoCoordinates?.end?.place_id && encode(geoCoordinates.end?.place_id)
      }, ${geoCoordinates?.end?.latitude}, ${geoCoordinates?.end?.longitude}`,
      units: 'metric',
      language: deviceLanguageAndRegion?.replace('_', '-'),
      avoid: 'indoor',
      departure_time: 'now',
      key: googleGeocodingKey,
    },
  );
};

const formatRouteData = (obj: any): Array<TRoutes> => {
  if (
    !obj?.data ||
    !obj?.status ||
    obj?.status > 299 ||
    !obj.data?.routes ||
    !Array.isArray(obj.data.routes)
  ) {
    return [];
  }
  return obj.data.routes;
};

export const getRouteData = async (geoCoordinates: TGeoCoordinates) => {
  return formatRouteData(
    await httpGet('https://maps.googleapis.com/maps/api/directions/json', {
      origin: `${geoCoordinates?.start?.latitude}, ${geoCoordinates?.start?.longitude}`,
      destination: `${geoCoordinates?.end?.latitude}, ${geoCoordinates?.end?.longitude}`,
      rovideRouteAlternatives: true,
      optimizeWaypoints: true,
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(),
      },
      avoidTolls: true,
      unitSystem: 'metric',
      language: deviceLanguageAndRegion?.replace('_', '-'),
      key: googleGeocodingKey,
    }),
  );
};
