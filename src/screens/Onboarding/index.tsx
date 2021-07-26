import React from 'react';
import { connect } from 'react-redux';
import { useState, useMemo, useTranslation, useRef, useNavigation } from '@hooks';
import { View, UsualButton, Text } from '@components';
import { SnapCarousel } from '@components';
import { TGlobalState } from '@types';
import Item from './components/Item';
import { data } from './utils';
import { sizes } from '@constants';
import { animation } from '@helpers';
import styles from './styles';
import { Dispatch } from 'redux';
import { setOnboarding } from '@reducers/appGlobalState';

type TProps = {
	dispatch: Dispatch
};


const Onboarding: React.FC<TProps> = ({ dispatch }) => {
	const { t } = useTranslation()
	const snapCarouselRef = useRef<SnapCarousel<any>>(null);
	const { navigate } = useNavigation();
	const [visibleItem, setVisibleItem] = useState<number>(0);

	const renderItem = ({ item, index }: any) => {
		return <Item {...item} key={index} />;
	};

	const keyExtractor = (item: any, index: number) => String(index);

	const dots = useMemo(
		() =>
			data.map((el, index) => {
				const activeDot = index == visibleItem;
				return <View style={activeDot ? styles.activeDot : styles.dot}></View>;
			}),
		[visibleItem],
	);

	const nextStep = () => {
		console.log(visibleItem);

		if (visibleItem === 2) {
			dispatch(setOnboarding(false))
		} else {
			snapCarouselRef.current?.snapToNext(true);
		}
	};

	animation('ios');

	return (
		<View style={styles.container}>
			<SnapCarousel
				ref={snapCarouselRef}
				initialNumToRender={1}
				onSnapToItem={setVisibleItem}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				style={styles.snapCarousel}
				data={data}
				sliderWidth={sizes.window_width}
				itemWidth={sizes.window_width}
			/>
			<View style={styles.dotsView}>{dots}</View>

			<View style={styles.usualButtonView}>
				<UsualButton
					disabled={false}
					dark={true}
					onPress={nextStep}
					loading={false}
					title={t('button.title.continue')} />
			</View>
		</View>
	);
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(Onboarding);