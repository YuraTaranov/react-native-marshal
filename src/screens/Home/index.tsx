import React from 'react';
import {
  useEffect,
  useCallback,
  useTranslation,
  useState,
  useNavigation,
  useMemo,
} from '@hooks';
import {
  View,
  Text,
  TouchableOpacity,
  QuestionButton,
  BonusCardModal,
  Icon,
  NotificationsManager,
  ReactNativeBiometrics,
  DeviceInfo,
  GradientBorder,
  RefreshControl,
} from '@components';
import styles from './styles';
import {Dispatch} from 'redux';
import {TGlobalState, TProfile, TPromotion} from '@types';
import {connect} from 'react-redux';
import {colors, urls} from '@constants';
import {httpPost, navigate} from '@services';
import {getPromotions} from '@reducers/promotions';
import {getPetrolStations} from '@reducers/petrolStations';
import {getProfile} from '@reducers/profile';
import {getSettings} from '@reducers/settings';
import {getReferralLink} from '@reducers/referral';
import {getPurchases} from '@reducers/purchases';
import HomeCarousel from './components/HomeCarousel/HomeCarousel';
import FuelBalance from './components/FuelBalance/FuelBalance';
import {getPromotionsMain} from '@reducers/promotionsMain';
import {getFuel} from '@reducers/fuel';
import {setFaceIdActiveLocal, setUserKey} from '@reducers/biometrics';
import BuyFuelInProgress from './components/BuyFuelInProgress/BuyFuelInProgress';
import {ScrollView} from 'react-native';

type TProps = {
  dispatch: Dispatch;
  promotions: TPromotion[];
  lang: string;
  refreshing: boolean;
  isBioActiveLocal: boolean;
  profile: TProfile;
};

const gradientColors = [
  'rgba(220, 221, 222, 0.1)',
  'rgba(220, 221, 222, 1)',
  'rgba(220, 221, 222, 0.1)',
];

const device_id = DeviceInfo.getUniqueId();

const Home: React.FC<TProps> = ({
  dispatch,
  promotions,
  lang,
  refreshing,
  profile,
  isBioActiveLocal,
}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  const [cardModalVisible, setCardModalVisible] = useState<boolean>(false);
  const [fuelModalVisible, setFuelModalVisible] = useState<boolean>(false);
  const [needUpdateBio, setNeedUpdateBio] = useState<boolean>(true);

  useEffect(() => {
    setOptions({
      headerLeft: () => <QuestionButton />,
    });
    dispatch(getProfile());
    dispatch(getReferralLink());
    // dispatch(getPurchases(1));
  }, []);

  useEffect(() => {
    dispatch(getPetrolStations());
    dispatch(getSettings());
    dispatch(getPromotionsMain());
    dispatch(getFuel());
    dispatch(getPromotions({page: 1}));
    // dispatch(getCreditCards()); // TODO: buy fuel
  }, [lang]);

  useEffect(() => {
    if (needUpdateBio) {
      if (profile?.setting_bio_auth === true) {
        setNeedUpdateBio(false);
        if (isBioActiveLocal) {
          createKeys();
        } else {
          turnOffBio();
        }
      } else if (profile?.setting_bio_auth === false) {
        setNeedUpdateBio(false);
        dispatch(setFaceIdActiveLocal(false));
      }
    }
  }, [profile?.setting_bio_auth, needUpdateBio]);

  const createKeys = useCallback(async () => {
    try {
      const res = await ReactNativeBiometrics.createKeys();
      const body = await httpPost(urls.biometricsAdd, {
        public_key: res.publicKey,
        device_id,
      });
      if (body.data.data.user_key) {
        dispatch(setUserKey(body.data.data.user_key));
        dispatch(getProfile());
      }
    } catch (e) {
      __DEV__ && console.log('createKeys error biometrics reg');
    }
  }, []);

  const turnOffBio = useCallback(async () => {
    try {
      const body = await httpPost(urls.profileUpdate, {
        setting_bio_auth: 0,
      });
      dispatch(getProfile());
      dispatch(setFaceIdActiveLocal(false));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const openCardModal = useCallback(() => {
    setCardModalVisible(true);
  }, []);

  const closeCardModal = useCallback(() => {
    setCardModalVisible(false);
  }, []);

  const closeFuelModal = useCallback(() => {
    setFuelModalVisible(false);
  }, []);

  const navigateToFuelCalculator = useCallback(() => {
    navigate('HomeStack', {
      screen: 'FuelCalculator',
    });
  }, []);

  const navigateToFuelPurchase = useCallback(() => {
    // navigate('HomeStack', {
    //   screen: 'FuelPurchase',
    //   params: {},
    // });
    setFuelModalVisible(true);
  }, []);

  const refreshPromotions = useCallback(() => {
    dispatch(getPromotionsMain());
    dispatch(getProfile());
  }, []);

  const refreshControl = useMemo(() => {
    return (
      <RefreshControl
        onRefresh={refreshPromotions}
        refreshing={refreshing}
        progressViewOffset={-30}
        colors={[colors.green_27A74C]}
        tintColor={colors.green_27A74C}
        size={24}
      />
    );
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <NotificationsManager />
      <FuelBalance />
      <BuyFuelInProgress
        isVisible={fuelModalVisible}
        closeModal={closeFuelModal}
      />
      <ScrollView refreshControl={refreshControl}>
        <View style={styles.buttonsBlock}>
          <GradientBorder colors={gradientColors} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonContainerCalc}
              onPress={navigateToFuelCalculator}>
              <Text style={styles.buttonText}>{t('Калькулятор')}</Text>
              <Icon
                size={28}
                name="calculator-duotone-2"
                color={colors.black_000000}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainerFuel}
              onPress={navigateToFuelPurchase}>
              <Text style={styles.buttonText}>{t('Купити пальне')}</Text>
              <Icon size={28} name="gas-2" color={colors.black_000000} />
            </TouchableOpacity>
          </View>
          <GradientBorder colors={gradientColors} />
        </View>
        {promotions ? <HomeCarousel promotions={promotions} /> : null}
      </ScrollView>
      <BonusCardModal
        isVisible={cardModalVisible}
        closeModal={closeCardModal}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  promotions: state.promotionsMain.data,
  refreshing: state.promotionsMain.refreshing,
  lang: state.appGlobalState.lang,
  needDisableBio: state.biometrics.needDisableBio,
  profile: state.profile.data,
  isBioActiveLocal: state.biometrics.faceIdActiveLocal,
});

export default connect(mapStateToProps)(Home);
