import React from 'react';
import {
  useCallback,
  useTranslation,
  useState,
  useEffect,
  useMemo,
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
} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {TProfile, TGlobalState, TFuelProfile, TFuel} from '@types';
import {colors, hitSlop} from '@constants';
import {Animated, ImageBackground} from 'react-native';
import {assets} from '@assets';

type TRadioButtonCBParams = {
  type: number;
  text: string;
};

type TProps = {
  profile: TProfile;
  fuel: TFuel[];
};

const FuelBalance: React.FC<TProps> = ({profile, fuel}) => {
  const {t} = useTranslation();

  const initialFuel: TFuelProfile = {
    id: 2,
    name: '95',
    liters: 0,
  };
  const [fuelType, setFuelType] = useState<TFuelProfile>(initialFuel);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [flipped, setFlipped] = useState(false);
  const animationValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // find and set the first type of fuel from the profile, the liters of which are not equal to 0, or type "95" if all 0
    if (profile?.fuels?.length) {
      const fuelAvailable = profile.fuels.find(item => item.liters);
      if (fuelAvailable) {
        setFuelType(fuelAvailable);
      }
    }
  }, [profile?.fuels]);

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
          <GradientBorder />
          <View style={styles.bonusContainer}>
            <Text style={styles.bonusValue}>{`${
              profile?.count_bonus || 0
            }`}</Text>
            <Text style={[styles.bonusValue, styles.bonusValueRegular]}>{`${t(
              'балів',
            )}`}</Text>
          </View>
          <GradientBorder />
          <View style={styles.fuelContainer}>
            <TouchableOpacity
              style={styles.fuelTypeContainer}
              disabled={flipped}
              onPress={openModal}>
              <View>
                <Text style={styles.fuelTitle}>{t('Вид топлива')}</Text>
                <View style={styles.fuelTypeValueContainer}>
                  <Text style={styles.fuelTypeValue}>{`${t(
                    fuelType.name,
                  )}`}</Text>
                  <Icon
                    name="arrow-down"
                    size={16}
                    color={colors.white_FFFFFF}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.fuelValueContainer}>
              <View>
                <Text style={styles.fuelTitle}>{t('Баланс палива')}</Text>
                <Text style={styles.fuelValue}>
                  {`${fuelType.liters}`}
                  <Text
                    style={[styles.fuelValue, styles.fuelValueRegular]}>{` ${t(
                    'л',
                  )}`}</Text>
                </Text>
              </View>
            </View>
          </View>
          <GradientBorder />
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
              <QRCode
                size={120}
                value={`${profile?.card || ''}`}
                backgroundColor="transparent"
              />
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
      const findFuel = fuel.find(item => item.id === params.type);
      if (findFuel) {
        const findFuelInProfile = profile?.fuels.find(
          pf => pf.id === findFuel?.id,
        ) || {...findFuel, liters: 0};
        setFuelType(findFuelInProfile);
      }
      closeModal();
    },
    [profile, fuel],
  );

  const renderItem: ({item}: {item: TFuel}) => JSX.Element = useCallback(
    ({item}) => (
      <RadioButtonCustom
        key={item.id}
        text={item.name}
        active={fuelType.id === item.id}
        onChange={onChangeFuelType}
        type={item.id}
      />
    ),
    [fuelType.id, onChangeFuelType],
  );

  const keyExtractor: (item: TFuel) => string = useCallback(
    item => String(item.id),
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
  fuel: state.fuel.data,
});

export default connect(mapStateToProps)(FuelBalance);
