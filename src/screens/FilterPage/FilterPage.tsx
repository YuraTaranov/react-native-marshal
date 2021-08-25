/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {
  useEffect,
  useCallback,
  useTranslation,
  useState,
  useNavigation,
} from '@hooks';

import {
  FilterButton,
  Icon,
  ListItem,
  RightButton,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@components';
import {setFilters} from '@reducers/filters';
import {colors} from '@constants';
import {connect} from 'react-redux';
import styles from './styles';

//Type
import {TFilters, TFuel, TGlobalState, TListItem, TPetrolStation} from '@types';
import {Dispatch} from 'redux';
import {getFilteredPetrolStationList} from '@helpers';

type TProps = {
  dispatch: Dispatch;
  petrolStations: TPetrolStation[];
  filters: TFilters;
};

const FilterPage: React.FC<TProps> = ({dispatch, petrolStations, filters}) => {
  const {t} = useTranslation();
  const {setOptions, navigate, goBack} = useNavigation();
  const [regionsLabel, setRegionsLabel] = useState('');
  const [showResultCounter, setShowResultCounter] = useState(0);
  const [FuelTypesList, setFuelTypesList] = useState<Array<TListItem>>([]);

  const getListFuelTypes = useCallback(() => {
    const FuelTypesSet = new Set();
    const Result: TListItem[] = [];

    petrolStations.forEach(i => {
      if (i?.fuels && Array.isArray(i.fuels)) {
        i.fuels.forEach(ti => {
          if (ti?.name) {
            FuelTypesSet.add(ti.name);
          }
        });
      }
    });

    for (let item of FuelTypesSet.values()) {
      const obj: TListItem = {
        title: `${item}`,
        status: filters.fuelTypes.includes(`${item}`)
          ? 'selected'
          : 'potential',
      };
      Result.push(obj);
    }

    return [...Result];
  }, [petrolStations, filters]);

  const onPressButton = () => {
    goBack();
  };
  const goToRegionsPage = () => navigate('RegionsPage');
  const onChangeSelected = (title: string) => () => {
    const List: TListItem[] =
      FuelTypesList.map(el => {
        if (el.title === title && el.status === 'selected') {
          return {...el, status: 'potential'};
        } else if (el.title === title && el.status === 'potential') {
          return {...el, status: 'selected'};
        }
        return el;
      }) || [];

    setFuelTypesList(List);
    dispatch(
      setFilters({
        ...filters,
        fuelTypes: List.filter(i => i.status === 'selected').map(i => i.title),
      }),
    );
  };

  const getCounerOfResult = useCallback(() => {
    const FilteredPetrolStationList = getFilteredPetrolStationList({
      filters,
      stations: petrolStations,
    });
    setShowResultCounter(FilteredPetrolStationList.length);
  }, [filters, petrolStations]);

  const cleaning = useCallback(() => {
    dispatch(setFilters({regions: [], fuelTypes: []}));
  }, [dispatch]);

  useEffect(() => {
    setFuelTypesList(getListFuelTypes());
  }, [getListFuelTypes, filters]);

  useEffect(() => {
    if (filters.regions.length > 3) {
      setRegionsLabel(
        `${filters.regions[0]}, ${filters.regions[1]} ${t('and_further')} ${
          filters.regions.length - 2
        }...}`,
      );
    } else if (filters.regions.length > 0) {
      setRegionsLabel(filters.regions.join(', '));
    } else {
      setRegionsLabel('');
    }
  }, [filters, t]);

  useEffect(() => {
    getCounerOfResult();
  }, [filters, getCounerOfResult]);

  useEffect(() => {
    setOptions({
      title: t('Filters'),
      headerRight: () => (
        <RightButton onPress={cleaning} title={t('Cleaning')} />
      ),
    });
  }, [cleaning, setOptions, t]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Regions')}</Text>
        </View>
        <TouchableOpacity style={styles.itemView} onPress={goToRegionsPage}>
          <View style={styles.leftView}>
            <Text style={styles.leftText}>
              {regionsLabel ? regionsLabel : t('All')}
            </Text>
          </View>
          <View style={styles.rightView}>
            <Icon name="right" color={colors.gray_2D2D2D} size={22} />
          </View>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Fuel')}</Text>
        </View>
        {FuelTypesList.map(({title, status}) => (
          <ListItem
            key={`__${title}__`}
            label={title}
            status={status}
            onPress={onChangeSelected(title)}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonView}>
        <FilterButton
          label={`${t('Show result')} (${showResultCounter})`}
          onPress={onPressButton}
        />
      </View>
    </View>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  petrolStations: state.petrolStations,
  filters: state.filters,
});

export default connect(mapStateToProps)(FilterPage);
