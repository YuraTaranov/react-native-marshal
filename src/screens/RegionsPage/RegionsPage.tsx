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
  ListItem,
  RightButton,
  ScrollView,
  Text,
  View,
} from '@components';
import {setFilters} from '@reducers/filters';
import {connect} from 'react-redux';
import styles from './styles';

//Type
import {TFilters, TGlobalState, TListItem, TPetrolStation} from '@types';
import {Dispatch} from 'redux';

type TProps = {
  dispatch: Dispatch;
  petrolStations: TPetrolStation[];
  filters: TFilters;
};

const RegionsPage: React.FC<TProps> = ({dispatch, petrolStations, filters}) => {
  const {t} = useTranslation();
  const {setOptions, goBack} = useNavigation();

  const getListRegions = useCallback(() => {
    const RegionsMap = new Map();
    const Result: TListItem[] = [];

    petrolStations.forEach(i => {
      RegionsMap.set(i.region, {
        title: i.region,
        status: filters.regions.includes(i.region) ? 'selected' : 'potential',
      });
    });

    for (let itemOfList of RegionsMap.values()) {
      Result.push(itemOfList);
    }

    return [...Result];
  }, [petrolStations, filters]);

  const [regions, setRegions] = useState<Array<TListItem>>(getListRegions());

  const onChangeSelected = useCallback(
    title => () => {
      setRegions(
        regions.map(i => {
          if (i.title === title && i.status === 'selected') {
            return {...i, status: 'potential'};
          } else if (i.title === title && i.status === 'potential') {
            return {...i, status: 'selected'};
          }
          return {...i};
        }),
      );
    },
    [regions],
  );

  const cleaning = useCallback(() => {
    dispatch(setFilters({regions: [], fuelTypes: []}));
  }, [dispatch]);

  useEffect(() => {
    setRegions(getListRegions());
  }, [filters, getListRegions, petrolStations]);

  useEffect(() => {
    setOptions({
      title: t('Filters'),
      headerRight: () => (
        <RightButton onPress={cleaning} title={t('Cleaning')} />
      ),
    });
  }, [setOptions, t, cleaning]);

  const onPressButton = () => {
    dispatch(
      setFilters({
        ...filters,
        regions: regions.filter(i => i.status === 'selected').map(i => i.title),
      }),
    );
    goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Regions')}</Text>
        </View>
        {regions.map(({title, status}) => {
          return (
            <ListItem
              key={`__${title}__${status}`}
              label={`${title} ${t('reg')}`}
              status={status}
              onPress={onChangeSelected(title)}
            />
          );
        })}
      </ScrollView>

      <View style={styles.buttonView}>
        <FilterButton label={t('Choose')} onPress={onPressButton} />
      </View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  petrolStations: state.petrolStations,
  filters: state.filters,
});

export default connect(mapStateToProps)(RegionsPage);
