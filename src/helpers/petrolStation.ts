// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TFilters, TPetrolStation} from '@types';

type FuncParams = {
  filters: TFilters;
  stations: TPetrolStation[];
};
export const getFilteredPetrolStationList = ({
  filters,
  stations,
}: FuncParams): TPetrolStation[] => {
  return stations.filter(s => {
    let isRegionSelected = true;
    if (filters.regions.length > 0) {
      isRegionSelected = filters.regions.includes(s.region);
    }

    let hasAllSelectedTypeOfFuel = true;
    if (filters.fuelTypes.length > 0) {
      hasAllSelectedTypeOfFuel = s.fuels.some(x =>
        filters.fuelTypes.includes(`${x.name}`),
      );
    }
    return isRegionSelected && hasAllSelectedTypeOfFuel;
  });
};
