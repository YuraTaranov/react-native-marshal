import React from 'react';
import {useCallback} from '@hooks';
import {View, FlatList, PromotionView} from '@components';
import {TGlobalState, TPromotion} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {Dispatch} from 'redux';
import {getPromotion} from '@reducers/promotion';

type TProps = {
  dispatch: Dispatch;
  promotions: TPromotion[];
};

const Promotions: React.FC<TProps> = ({dispatch, promotions}) => {
  const onPressItem = useCallback(
    id => () => {
      dispatch(getPromotion(id));
    },
    [],
  );

  const renderItem: ({item}: {item: TPromotion}) => JSX.Element = useCallback(
    ({item}) => (
      <PromotionView item={item} onPress={onPressItem} bgBorderRadius={6} />
    ),
    [],
  );

  const keyExtractor: (item: TPromotion) => string = useCallback(
    item => String(item.id),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={promotions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  promotions: state.promotions.data,
});

export default connect(mapStateToProps)(Promotions);
