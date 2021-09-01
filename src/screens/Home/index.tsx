import React from 'react';
import {
  useEffect,
  useCallback,
  useMemo,
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
} from '@components';

import {connect} from 'react-redux';
import {resetAppGlobalState} from '@reducers/appGlobalState';

import {getPromotions} from '@reducers/promotions';
import {colors} from '@constants';
import HomeCarousel from './components/HomeCarousel/HomeCarousel';
import {getPetrolStations} from '@reducers/petrolStations';
import styles from './styles';

//Type
import {Dispatch} from 'redux';
import {TGlobalState} from '@types';
import {navigate} from '@services';
type TProps = {
  dispatch: Dispatch;
};

const fakeData = {
  bonuses: 250,
  fuel: 80,
};

const Home: React.FC<TProps> = ({dispatch}) => {
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
    dispatch(getPromotions({page: 1}));
    dispatch(getPetrolStations());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContentContainer}>
        <View style={styles.balanceContainer}>
          <View style={styles.bonusesContainer}>
            <Text style={styles.balanceTitle}>{t('Баланс бонусів')}</Text>
            <Text style={styles.balanceValue}>{`${fakeData.bonuses} ${t(
              'балів',
            )}`}</Text>
          </View>
          <View style={styles.fuelContainer}>
            <Text style={styles.balanceTitle}>{t('Баланс палива')}</Text>
            <Text style={styles.balanceValue}>{`${fakeData.fuel} ${t(
              'літрів',
            )}`}</Text>
          </View>
        </View>
      </View>
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
      <HomeCarousel />
      <BonusCardModal
        isVisible={cardModalVisible}
        closeModal={closeCardModal}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(Home);
