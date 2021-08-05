import React from 'react';
import {Dispatch} from 'redux';
import {useCallback} from '@hooks';
import {View, Text, FlatList, TouchableOpacity, Icon} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '@constants';
import ListEmptyComponent from './components/ListEmptyComponent/ListEmptyComponent';

type TProps = {
  dispatch: Dispatch;
};

type TCar = {
  id: string;
  name: string;
};

const fakeData: TCar[] = [
  {
    id: '1',
    name: 'Volkswagen Polo',
  },
  {
    id: '1',
    name: 'Volkswagen Polo',
  },
];

const Cars: React.FC<TProps> = ({dispatch}) => {
  const onPressCar = useCallback(id => () => {}, []);

  const renderItem: ({item}: {item: TCar}) => JSX.Element = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onPressCar(item.id)}>
        <Icon name="car" color={colors.black_1E1A1A} size={24} />
        <Text style={styles.name}>{item.name}</Text>
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
      {/* FIXME: */}
      {false ? (
        <FlatList
          data={fakeData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.flatList}
        />
      ) : (
        <ListEmptyComponent />
      )}
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  // reducer: state.reducer
});

export default connect(mapStateToProps)(Cars);
