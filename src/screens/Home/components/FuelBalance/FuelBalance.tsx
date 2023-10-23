import React from 'react';
import {
  useCallback,
  useTranslation,
  useState,
  useEffect,
  useMemo,
  useIsFocused,
  usePrevious,
} from '@hooks';
import {
  View,
  Text,
  Icon,
  TouchableOpacity,
  Modal,
  RadioButtonCustom,
  FlatList,
  QRCode,
  Image,
  GradientBorder,
  VerticalGradientBorder,
} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {TProfile, TGlobalState, TFuelData} from '@types';
import {colors, fuel, hitSlop, sizes} from '@constants';
import {ActivityIndicator, Animated, ImageBackground} from 'react-native';
import {assets} from '@assets';
import {Dispatch} from 'redux';
import {getDiscount} from '@reducers/discount';
import {formatPriceName} from '@helpers';
import {setType} from '@reducers/appGlobalState';
import {getCards} from '@reducers/cards';
import {BlurView} from '@react-native-community/blur';

type TRadioButtonCBParams = {
  type: number;
  text: string;
};

type TProps = {
  dispatch: Dispatch;
  screenType: 'home' | 'profile';
  profile: TProfile;
  cards: TGlobalState['cards'];
  fuelType: number;
  discount: TGlobalState['discount'];
};

const FuelBalance: React.FC<TProps> = ({
  screenType,
  cards,
  profile,
  discount,
  fuelType,
  dispatch,
}) => {
  const {t} = useTranslation();
  const {name, surname} = profile;

  const qrCode = cards.data && cards.data.length ? cards?.data[0]?.qr : null;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [flipped, setFlipped] = useState(false);
  const isFocused = useIsFocused();
  const animationValue = useState(new Animated.Value(0))[0];
  const [activeDiscount, setActiveDiscount] = useState(() => fuel[0]);
  const previousType = usePrevious(discount.data.type);

  useEffect(() => {
    if (!!flipped) {
      dispatch(getCards());
    }
  }, [flipped]);

  const userCardName = useMemo(
    () => `${name ?? ''} ${surname ?? surname}`,
    [name, surname],
  );

  useEffect(() => {
    const findFuel = fuel.find(item => item.type === fuelType);
    if (findFuel) setActiveDiscount(findFuel);
  }, [fuelType]);

  useEffect(() => {
    if (isFocused && fuelType !== previousType && screenType == 'home') {
      dispatch(getDiscount(fuelType));
    }
  }, [fuelType, isFocused]);

  const cardNumber = useMemo(() => {
    if (profile?.card) {
      return String(profile.card)
        .replace(/\D/, '')
        .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
    } else {
      return '';
    }
  }, [profile?.card]);

  const flipCard = () => {
    setFlipped(!flipped);
    Animated.spring(animationValue, {
      toValue: flipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = animationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '180deg'],
  });

  const backInterpolate = animationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['180deg', '90deg', '0deg'],
  });

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };

  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  const discountData = useMemo(() => {
    if (discount) {
      return formatPriceName(discount.data.discount);
    }
  }, [discount]);

  const renderFront = () => (
    <View>
      <Animated.View
        style={[styles.card, styles.frontCard, frontAnimatedStyle]}>
        <ImageBackground
          source={assets.CARD_BACKGROUND}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}>
          <TouchableOpacity
            onPress={flipCard}
            activeOpacity={1}
            disabled={!cardNumber}
            style={styles.flipContainer}>
            <View style={styles.fingerprintContainer}>
              {cardNumber ? (
                <Image
                  source={assets.FINGERPRINT}
                  style={styles.fingerprint}
                  resizeMode="contain"
                />
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={flipCard}
            style={styles.logoContainer}
            activeOpacity={1}>
            <Image
              source={assets.CARD_LOGO}
              style={styles.logo}
              resizeMode="cover"
            />
          </TouchableOpacity>
          {screenType === 'home' ? (
            <View style={{flex: 1}}>
              <GradientBorder style={styles.gradientBorder} />
              <View style={styles.fuelContainer}>
                <TouchableOpacity
                  style={styles.fuelTypeContainer}
                  disabled={flipped}
                  onPress={openModal}>
                  <View>
                    <Text style={styles.fuelTitle}>{t('Вид топлива')}</Text>
                    <View style={styles.fuelTypeValueContainer}>
                      <Text style={styles.fuelTypeValue}>{`${t(
                        activeDiscount.title,
                      )}`}</Text>
                      <Icon
                        name="arrow-down"
                        size={16}
                        color={colors.white_FFFFFF}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <VerticalGradientBorder />
                <View style={styles.fuelValueContainer}>
                  <View>
                    <Text style={styles.fuelTitle}>{t('Поточна знижка')}</Text>
                    <Text style={styles.fuelValue}>
                      {discount.loading ? (
                        <ActivityIndicator
                          size={'small'}
                          color={colors.white_FFFFFF}
                        />
                      ) : (
                        <>
                          {`${discountData?.value}`}
                          <Text
                            style={[
                              styles.fuelValue,
                              styles.fuelValueRegular,
                            ]}>{` ${discountData?.title}`}</Text>
                        </>
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              <GradientBorder style={styles.gradientBorder} />
            </View>
          ) : (
            <View style={styles.contentContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{userCardName}</Text>
              </View>
              <View style={styles.cardNumberContainer}>
                <Text style={styles.cardNunber}>{`${cardNumber}`}</Text>
              </View>
            </View>
          )}
        </ImageBackground>
      </Animated.View>
    </View>
  );

  const renderBack = () => (
    <View>
      <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
        <TouchableOpacity
          onPress={flipCard}
          activeOpacity={1}
          style={{width: '100%'}}>
          <View style={styles.fingerprintContainer}>
            <Image
              source={assets.FINGERPRINT}
              style={styles.fingerprint}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.bonusCardNumber}>{t('Карта лояльності')}</Text>
        {profile?.card ? (
          <>
            <Text style={{...styles.bonusCardNumber, marginTop: 4}}>
              {cardNumber}
            </Text>
            <View style={styles.qrCodeContainer}>
              <>
                <QRCode
                  size={sizes.cardHeight / 2}
                  value={`${qrCode || profile?.card || ''}`}
                  backgroundColor="transparent"
                />
                {!cards.loading ? null : (
                  <>
                    <View style={styles.loaderView}>
                      <ActivityIndicator size={'large'} color={'black'} />
                    </View>
                    <BlurView
                      style={styles.blurView}
                      blurType="light"
                      blurAmount={3}
                      reducedTransparencyFallbackColor="white"
                    />
                  </>
                )}
              </>
            </View>
          </>
        ) : null}
      </Animated.View>
    </View>
  );

  const openModal = useCallback(() => {
    fuel?.length && setIsModalVisible(true);
  }, [fuel]);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onChangeFuelType = useCallback(
    (params: TRadioButtonCBParams) => {
      const findFuel = fuel.find(item => item.type === params.type);
      if (findFuel) {
        dispatch(setType(findFuel.type));
        setActiveDiscount(findFuel);
      }
      closeModal();
    },
    [fuel],
  );

  const renderItem: ({item}: {item: TFuelData}) => JSX.Element = useCallback(
    ({item}) => {
      return (
        <RadioButtonCustom
          key={item.title}
          text={t(item.title)}
          active={activeDiscount.type === item.type}
          onChange={onChangeFuelType}
          type={item.type}
        />
      );
    },
    [activeDiscount, fuel],
  );

  const keyExtractor: (item: TFuelData) => string = useCallback(
    item => item.title,
    [],
  );

  return (
    <View style={styles.container}>
      {renderBack()}
      {renderFront()}
      <Modal
        isVisible={isModalVisible}
        backdropTransitionOutTiming={0}
        backdropColor="#000000"
        backdropOpacity={0.5}
        onBackdropPress={closeModal}
        style={styles.modalContainer}>
        <View style={styles.modalContentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t('Вид топлива')}:</Text>
            <TouchableOpacity onPress={closeModal} hitSlop={hitSlop}>
              <Icon name="x" size={24} color={colors.black_000000} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={fuel}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
  discount: state.discount,
  fuelType: state.appGlobalState.fuelType,
  cards: state.cards,
});

export default connect(mapStateToProps)(FuelBalance);
