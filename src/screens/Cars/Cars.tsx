import React from 'react';
import {Dispatch} from 'redux';
import {useCallback, useTranslation} from '@hooks';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Icon,
  UsualButton,
} from '@components';
import {TGlobalState, TCar} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '@constants';
import ListEmptyComponent from './components/ListEmptyComponent/ListEmptyComponent';
import {navigate} from '@services';

type TProps = {
  dispatch: Dispatch;
  cars: TCar[];
};

const Cars: React.FC<TProps> = ({dispatch, cars}) => {
  const {t} = useTranslation();

  const onPressCar = useCallback(
    car => () => {
      navigate('ProfileStack', {
        screen: 'AddCar',
        params: {car},
      });
    },
    [],
  );

  const addCar = useCallback(() => {
    navigate('ProfileStack', {
      screen: 'AddCar',
      params: {},
    });
  }, []);

  const renderItem: ({item}: {item: TCar}) => JSX.Element = useCallback(
    ({item}) => (
      <TouchableOpacity style={styles.itemContainer} onPress={onPressCar(item)}>
        <Icon name="car" color={colors.black_1E1A1A} size={24} />
        <Text
          style={
            styles.name
          }>{`${item.car_brand.name} ${item.car_model.name}`}</Text>
        <Icon name="right" color={colors.black_1E1A1A} size={24} />
      </TouchableOpacity>
    ),
    [],
  );
  const keyExtractor: (item: TCar) => string = useCallback(
    item => String(item.id),
    [],
  );

  return (
    <View style={styles.container}>
      {cars?.length ? (
        <>
          <FlatList
            data={cars}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
          <View style={styles.buttonContainer}>
            <Text style={styles.youCanAdd}>
              {t('Ви можете додати до трьох автомобілів')}
            </Text>
            <UsualButton
              title={t('Додати авто')}
              onPress={addCar}
              disabled={cars?.length > 2}
            />
          </View>
        </>
      ) : (
        <ListEmptyComponent />
      )}
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  cars: state.cars.data,
});

export default connect(mapStateToProps)(Cars);
