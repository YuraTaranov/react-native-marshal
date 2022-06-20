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
  RefreshControl,
  Alert,
} from '@components';
import styles from './styles';
import {Dispatch} from 'redux';
import {TGlobalState, TPromotion} from '@types';
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
import {ScrollView} from 'react-native-gesture-handler';
import {getPromotionsMain} from '@reducers/promotionsMain';
import {setBioTurnOffAfterLogout} from '@reducers/logout';
import {getFuel} from '@reducers/fuel';
// import {getCreditCards} from '@reducers/creditCards';
import {setFaceIdActiveLocal, setNeedDisableBio} from '@reducers/biometrics';
import BuyFuelInProgress from './components/BuyFuelInProgress/BuyFuelInProgress';

type TProps = {
  dispatch: Dispatch;
  promotions: TPromotion[];
  lang: string;
  refreshing: boolean;
  needDisableBio: boolean;
};

const Home: React.FC<TProps> = ({
  dispatch,
  promotions,
  lang,
  refreshing,
  needDisableBio,
}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  const [cardModalVisible, setCardModalVisible] = useState<boolean>(false);
  const [fuelModalVisible, setFuelModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setOptions({
      headerLeft: () => <QuestionButton />,
      headerRight: () => (
        <TouchableOpacity onPress={openCardModal}>
          <Icon size={24} name="bonus_card" color={colors.white_FFFFFF} />
        </TouchableOpacity>
      ),
    });
    dispatch(getProfile());
    dispatch(getReferralLink());
    dispatch(getPurchases({page: 1}));
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
    setTimeout(() => {
      dispatch(setBioTurnOffAfterLogout(false));
    }, 2000);
  }, []);

  useEffect(() => {
    if (needDisableBio) {
      turnOffBio();
    }
  }, [needDisableBio]);

  const openCardModal = useCallback(() => {
    setCardModalVisible(true);
  }, []);

  const closeCardModal = useCallback(() => {
    setCardModalVisible(false);
  }, []);

  const closeFuelModal = useCallback(() => {
    setFuelModalVisible(false);
  }, []);

  const turnOffBio = useCallback(async () => {
    try {
      dispatch(setFaceIdActiveLocal(false));
      const body = await httpPost(urls.profileUpdate, {
        setting_bio_auth: 0,
      });
      dispatch(getProfile());
      dispatch(setNeedDisableBio(false));
    } catch (error) {
      console.log(error);
    }
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
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonContainerCalc}
            onPress={navigateToFuelCalculator}>
            <Icon
              size={24}
              name="calculator-duotone"
              color={colors.green_009F30}
            />
            <Text style={styles.buttonText}>{t('Калькулятор')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainerFuel}
            onPress={navigateToFuelPurchase}>
            <Icon size={24} name="gas" color={colors.green_009F30} />
            <Text style={styles.buttonText}>{t('Купити пальне')}</Text>
          </TouchableOpacity>
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
});

export default connect(mapStateToProps)(Home);
