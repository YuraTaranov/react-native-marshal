import React from 'react';
import {
  useCallback,
  useEffect,
  useNavigation,
  useRoute,
  useState,
  useTranslation,
  useMemo,
} from '@hooks';
import {
  Alert,
  KeyboardAvoidingView,
  MaterialInput,
  ScrollView,
  Text,
  UsualButton,
  View,
} from '@components';

import {connect} from 'react-redux';
import {InputPhone, ItemPrice, WayToPayItem, PayTypeModal} from '..';
import styles from './styles';

//Type
import type {
  FuelPurchaseRouteProp,
  TGlobalState,
  TPrice,
  TCreditCard,
  TPaySystemContent,
  TFuel,
} from '@types';
// import {Dispatch} from 'redux';

type TProps = {
  index: number;
  creditCards: TCreditCard[];
  fuelCountToBuy: string;
  fuel: TFuel[];
};

const sortById = (a: TPaySystemContent, b: TPaySystemContent): number => {
  if (a.id < b.id) {
    return -1;
  } else if (a.id > b.id) {
    return 1;
  } else {
    return 0;
  }
};

const InnerPage: React.FC<TProps> = ({
  index,
  creditCards,
  fuelCountToBuy,
  fuel,
}) => {
  const {t} = useTranslation();
  const {setParams, navigate} = useNavigation();
  const {params} = useRoute<FuelPurchaseRouteProp>();

  const paySystemsInit: TPaySystemContent[] = [
    {
      id: 98,
      action: () => {},
      title: 'Google Pay',
      icon: 'googlePay',
    },
    {
      id: 99,
      action: () => {},
      title: t('BuyBalls'),
      icon: 'gift',
    },
    {
      id: 100,
      action: () => navigate('AddCard'),
      title: t('AddPaymentCard'),
      icon: 'plus',
    },
  ];

  const fuelToBuyFormatted = useMemo(() => {
    return fuelCountToBuy ? String(Math.ceil(+fuelCountToBuy)) : '';
  }, [fuelCountToBuy]);

  const [fuelCounter, setFuelAmount] = useState<string>(fuelToBuyFormatted);
  const [prices, setPrices] = useState<TFuel[]>(fuel);
  const [selectedPriceId, setSelectedPriceId] = useState<number | null>(null);
  const [selectedPayType, setSelectedPayType] =
    useState<TPaySystemContent | null>(null);
  const [phoneNumber, setPhone] = useState('');
  const [fullCostOfFuel, setFullCostOfFuel] = useState(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [paySystems, setPaySystems] =
    useState<Array<TPaySystemContent>>(paySystemsInit);
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const showModal = () => {
    setIsVisible(true);
  };

  const hiddenModal = () => {
    setIsVisible(false);
  };

  const onChoose = () => {
    const selectedPaySystem: TPaySystemContent[] = paySystems.filter(
      i => !!i.selected,
    );
    if (Array.isArray(selectedPaySystem) && selectedPaySystem.length > 0) {
      hiddenModal();
      selectedPaySystem[0].action();
    }
  };

  const onSelectedPrice = (id: number) => {
    setSelectedPriceId(id);
  };

  const onChangeFuelAmount = (str: string) => {
    if (str.startsWith('0')) return;
    const formattedValue = str ? str.replace(/[^0-9]/g, '') : str;
    setFuelAmount(formattedValue);
  };

  const addCreditCard = useCallback(() => {
    const newMap: Map<number, TPaySystemContent> = new Map();
    const newArray: TPaySystemContent[] = [];

    creditCards.forEach((card, ind) => {
      const id = ind + 1;
      newMap.set(id, {
        id,
        action: () => {},
        title: card.number,
        icon: 'creditcard',
      });
    });

    paySystems.forEach(item => {
      newMap.set(item.id, item);
    });

    newMap.forEach(card => {
      newArray.push(card);
    });

    setPaySystems(newArray.sort(sortById));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creditCards]);

  const onSelect = (id: number) => {
    setPaySystems(
      paySystems.map(l => {
        const obj = {...l};
        if (obj.id === id) {
          obj.selected = true;
        } else {
          obj.selected = false;
        }
        return obj;
      }),
    );
  };

  const PayForFuel = () => {
    // eslint-disable-next-line no-alert
    Alert.alert('Запуск процесса оплаты');
  };

  useEffect(() => {
    if (
      +fuelCounter > 9 &&
      fullCostOfFuel > 0 &&
      paySystems.some(item => !!item?.selected) &&
      (!index || !!phoneNumber)
    ) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  }, [paySystems, fullCostOfFuel, index, phoneNumber, fuelCounter]);

  useEffect(() => {
    addCreditCard();
  }, [addCreditCard, creditCards]);

  useEffect(() => {
    if (params?.openModal) {
      setIsVisible(true);
      setParams({openModal: false});
    }
  }, [params, setParams]);

  useEffect(() => {
    const price = selectedPriceId
      ? prices.filter(i => i.id === selectedPriceId)[0].price
      : 0;
    if (fuelCounter) {
      setFullCostOfFuel(+price * +fuelCounter);
    } else {
      setFullCostOfFuel(0);
    }
  }, [fuelCounter, selectedPriceId, prices]);

  useEffect(() => {
    const newArray: TPaySystemContent[] = paySystems.filter(
      item => !!item?.selected,
    );
    if (Array.isArray(newArray) && newArray.length > 0) {
      setSelectedPayType(newArray[0]);
    } else {
      setSelectedPayType(null);
    }
  }, [paySystems]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.priceContainer}>
          {prices.map((priceData: TFuel) => {
            return (
              <ItemPrice
                {...priceData}
                onSelected={onSelectedPrice}
                selectedId={selectedPriceId}
                key={priceData?.id}
              />
            );
          })}
        </View>
        {!!index && (
          <View style={styles.phoneRow}>
            <InputPhone setPhone={setPhone} />
          </View>
        )}
        <View style={styles.inputContainer}>
          <MaterialInput
            keyboardType={'number-pad'}
            returnKeyType={'default'}
            value={fuelCounter}
            lineWidth={0.5}
            onChangeText={onChangeFuelAmount}
            label={t('FuelAmountByLiters')}
            inputContainerStyle={styles.inputRow}
            maxLength={3}
          />
          <View style={styles.curView}>
            <Text style={styles.curText}>{`${t(
              'currency',
            )} ${fullCostOfFuel.toFixed(2)}`}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <WayToPayItem
            onPress={showModal}
            isVisible={isVisible}
            selectedPayType={selectedPayType}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <UsualButton
          title={t('PayForFuel')}
          disabled={isDisabledButton}
          buttonStyle={styles.usualButton}
          onPress={PayForFuel}
        />
      </View>
      <PayTypeModal
        closeModal={hiddenModal}
        isVisible={isVisible}
        onChoose={onChoose}
        onSelect={onSelect}
        paySystems={paySystems}
      />
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  creditCards: state.creditCards,
  fuel: state.fuel.data,
});

export default connect(mapStateToProps)(InnerPage);
