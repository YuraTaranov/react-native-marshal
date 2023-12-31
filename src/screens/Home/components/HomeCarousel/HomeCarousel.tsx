import React, {useEffect} from 'react';
import {useCallback, useTranslation, useState} from '@hooks';
import {View, SnapCarousel, Pagination, PromotionView} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {width} from '@constants';
import {TPromotion} from '@types';
import {Dispatch} from 'redux';
import {getPromotion} from '@reducers/promotion';

type TProps = {
  dispatch: Dispatch;
  promotions: TPromotion[];
};

const HomeCarousel: React.FC<TProps> = ({dispatch, promotions}) => {
  const {t} = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [data, setData] = useState<TPromotion[]>([]);

  useEffect(() => {
    // чтобы избежать бага с рендером слайдов после логаут-логина
    setTimeout(() => {
      setData(promotions?.length ? promotions : []);
    }, 10);
  }, [promotions]);

  const onPressItem = useCallback(
    id => () => {
      dispatch(getPromotion({id}));
    },
    [],
  );

  const renderItem = useCallback(({item}: {item: TPromotion}) => {
    return (
      <View>
        <PromotionView item={item} onPress={onPressItem} />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      {data?.length ? (
        <>
          <SnapCarousel
            data={data}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
            onBeforeSnapToItem={setActiveIndex}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            activeAnimationType="spring"
            lockScrollWhileSnapping={true}
            lockScrollTimeoutDuration={350}
            shouldOptimizeUpdates={true}
            removeClippedSubviews={true}
            enableMomentum={true}
            //   autoplay
            //   loop={true}
            //   autoplayDelay={1000}
            //   autoplayInterval={4000}
          />
          <Pagination
            dotsLength={data?.length}
            activeDotIndex={activeIndex}
            containerStyle={styles.dotsContainer}
            dotStyle={styles.dotStyle}
            inactiveDotStyle={styles.dotsStyleInactive}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />
        </>
      ) : null}
    </View>
  );
};

export default connect()(HomeCarousel);
