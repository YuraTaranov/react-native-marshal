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
} from '@components';
import styles from './styles';
import {Dispatch} from 'redux';
import {TGlobalState, TPromotion} from '@types';
import {connect} from 'react-redux';
import {colors} from '@constants';
import {navigate} from '@services';
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
import {getCreditCards} from '@reducers/creditCards';
type TProps = {
  dispatch: Dispatch;
  promotions: TPromotion[];
  lang: string;
  refreshing: boolean;
};

const Home: React.FC<TProps> = ({dispatch, promotions, lang, refreshing}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  const [cardModalVisible, setCardModalVisible] = useState<boolean>(false);

  const openCardModal = useCallback(() => {
    setCardModalVisible(true);
  }, []);

  const closeCardModal = useCallback(() => {
    setCardModalVisible(false);
  }, []);

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
    dispatch(getCreditCards());
  }, [lang]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setBioTurnOffAfterLogout(false));
    }, 2000);
  }, []);

  const refreshPromotions = useCallback(() => {
    dispatch(getPromotionsMain());
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
      <ScrollView refreshControl={refreshControl}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonContainerCalc}
            onPress={() => navigate('FuelCalculator')}>
            <Icon
              size={24}
              name="calculator-duotone"
              color={colors.green_009F30}
            />
            <Text style={styles.buttonText}>{t('Калькулятор')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainerFuel}
            onPress={() => navigate('FuelPurchase')}>
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
});

export default connect(mapStateToProps)(Home);
