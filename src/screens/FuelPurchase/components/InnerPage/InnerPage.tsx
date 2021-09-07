import React from 'react';
import {
  useCallback,
  useEffect,
  useNavigation,
  useRoute,
  useState,
  useTranslation,
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
} from '@types';
// import {Dispatch} from 'redux';

type TProps = {
  index: number;
  creditCards: TCreditCard[];
};

const mopData: TPrice[] = [
  {
    title: 'Бензин A95',
    cost: 29.85,
    id: 1,
  },
  {
    title: 'Бензин A98',
    cost: 30.85,
    id: 2,
  },
  {
    title: 'Бензин A100',
    cost: 36.5,
    id: 3,
  },
  {
    title: 'Бензин A76',
    cost: 22.45,
    id: 4,
  },
];

const sortById = (a: TPaySystemContent, b: TPaySystemContent): number => {
  if (a.id < b.id) {
    return -1;
  } else if (a.id > b.id) {
    return 1;
  } else {
    return 0;
  }
};

const InnerPage: React.FC<TProps> = ({index, creditCards}) => {
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

  const [fuelCouner, setFuelAmount] = useState<number | null>(null);
  const [prices, setPrices] = useState<TPrice[]>(mopData);
  const [selectedPriceId, setSelectedPriceId] = useState<number | null>(null);
  const [phoneNumber, setPhone] = useState('');
  const [fullCostOfFuel, setFullCostOfFuel] = useState(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [paySystems, setPaySystems] =
    useState<Array<TPaySystemContent>>(paySystemsInit);
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const showModal = () => {
    setIsVisible(true);
  };

  const hidenModal = () => {
    setIsVisible(false);
  };

  const onChoose = () => {
    const selectedPaySystem: TPaySystemContent[] = paySystems.filter(
      i => !!i.selected,
    );
    if (Array.isArray(selectedPaySystem) && selectedPaySystem.length > 0) {
      hidenModal();
      selectedPaySystem[0].action();
    }
  };

  const onSelectedPrice = (id: number) => {
    setSelectedPriceId(id);
  };

  const onChangeFuelAmount = (str: string) => {
    setFuelAmount(+str || null);
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

  const PayForFuel = () => {
    // eslint-disable-next-line no-alert
    alert('Запуск процесса оплаты');
  };

  useEffect(() => {
    if (
      fullCostOfFuel > 0 &&
      paySystems.some(item => !!item?.selected) &&
      (!index || !!phoneNumber)
    ) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  }, [paySystems, fullCostOfFuel, index, phoneNumber]);

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
    const cost = selectedPriceId
      ? prices.filter(i => i.id === selectedPriceId)[0].cost
      : 0;
    if (fuelCouner) {
      setFullCostOfFuel(cost * fuelCouner);
    } else {
      setFullCostOfFuel(0);
    }
  }, [fuelCouner, selectedPriceId, prices]);

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

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.priceContainer}>
          {prices.map((priceData: TPrice) => {
            return (
              <ItemPrice
                {...priceData}
                onSelected={onSelectedPrice}
                selectedId={selectedPriceId}
              />
            );
          })}
        </View>
        {!!index && (
          <View style={styles.phoneRow}>
            <InputPhone setPhone={setPhone} />
          </View>
        )}
        <View style={styles.row}>
          <MaterialInput
            keyboardType={'numeric'}
            returnKeyType={'default'}
            value={fuelCouner}
            lineWidth={0.5}
            onChangeText={onChangeFuelAmount}
            label={t('FuelAmountByLiters')}
            inputContainerStyle={styles.inputRow}
          />
          <View style={styles.curView}>
            <Text style={styles.curText}>{`${t(
              'currency',
            )} ${fullCostOfFuel.toFixed(2)}`}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <WayToPayItem onPress={showModal} isVisible={isVisible} />
        </View>
      </ScrollView>
      <UsualButton
        title={t('PayForFuel')}
        disabled={isDisabledButton}
        buttonStyle={styles.usualButton}
        onPress={PayForFuel}
      />
      <PayTypeModal
        closeModal={hidenModal}
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
});

export default connect(mapStateToProps)(InnerPage);
