import React from 'react';
import {useCallback, useMemo, useTranslation, useState} from '@hooks';
import {View, Text, SnapCarousel, Pagination, PromotionView} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {width} from '@constants';
import {TPromotion, TGlobalState} from '@types';
import {Dispatch} from 'redux';
import {getPromotion} from '@reducers/promotion';

const fakeData = [
  {
    id: 1,
    title: 'Безкоштовний напій',
    description: '*Напій на вибір',
    type: 1,
  },
  {
    id: 2,
    title: 'Безкоштовний напій',
    description: '*Напій на вибір',
    type: 2,
  },
  {
    id: 3,
    title: 'Безкоштовний напій',
    description: '*Напій на вибір',
    type: 3,
  },
];

type TProps = {
  dispatch: Dispatch;
  promotions: TPromotion[];
};

// type TCarouselItem = {
//   id: number;
//   title: string;
//   description: string;
// };

const HomeCarousel: React.FC<TProps> = ({dispatch, promotions}) => {
  const {t} = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onPressItem = useCallback(
    id => () => {
      dispatch(getPromotion(id));
    },
    [],
  );

  const renderItem = useCallback(({item}: {item: TPromotion}) => {
    return (
      <View style={styles.itemContainer}>
        <PromotionView item={item} bgBorderRadius={6} onPress={onPressItem} />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <SnapCarousel
        data={fakeData}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width - 32}
        onBeforeSnapToItem={setActiveIndex}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        activeAnimationType="spring"
        //   autoplay
        //   loop={true}
        //   autoplayDelay={1000}
        //   autoplayInterval={4000}
        lockScrollWhileSnapping={true}
        lockScrollTimeoutDuration={350}
        shouldOptimizeUpdates={true}
        removeClippedSubviews={true}
        enableMomentum={true}
      />
      <Pagination
        dotsLength={fakeData.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.dotsStyleInactive}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  promotion: state.promotions.data,
});

export default connect(mapStateToProps)(HomeCarousel);
