export type TPropsForRouteUrl = {
  startLatitude: number | string;
  startLongitude: number | string;
  endLatitude: number | string;
  endLongitude: number | string;
};

export const getUrlForRoute = ({
  startLatitude,
  startLongitude,
  endLatitude,
  endLongitude,
}: TPropsForRouteUrl): string => {
  return `https://www.google.com/maps/dir/?api=1&origin=${startLatitude}%2C${startLongitude}&destination=${endLatitude}%2C${endLongitude}&travelmode=driving&hl=ru`;
};
