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
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {Dispatch} from 'redux';
import {getPromotions} from '@reducers/promotions';
import {colors} from '@constants';
import HomeCarousel from './components/HomeCarousel/HomeCarousel';

const fakeData = {
  bonuses: 250,
  fuel: 80,
};

type TProps = {
  dispatch: Dispatch;
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
    dispatch(getPromotions({page: 1}));
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
        <TouchableOpacity style={styles.buttonContainerCalc}>
          <Icon
            size={24}
            name="calculator-duotone"
            color={colors.green_009F30}
          />
          <Text style={styles.buttonText}>{t('Калькулятор')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainerFuel}>
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
