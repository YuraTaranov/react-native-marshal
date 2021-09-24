import React from 'react';
import {
  useEffect,
  useCallback,
  useTranslation,
  useState,
  useNavigation,
} from '@hooks';
import {
  View,
  Text,
  TouchableOpacity,
  QuestionButton,
  BonusCardModal,
  Icon,
  NotificationsManager,
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
type TProps = {
  dispatch: Dispatch;
  promotions: TPromotion[];
};

const Home: React.FC<TProps> = ({dispatch, promotions}) => {
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

  return (
    <View style={styles.container}>
      <NotificationsManager />
      <FuelBalance />
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
      <BonusCardModal
        isVisible={cardModalVisible}
        closeModal={closeCardModal}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  promotions: state.promotions.data,
});

export default connect(mapStateToProps)(Home);
