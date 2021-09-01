import React from 'react';
import {useTranslation, useState, useEffect} from '@hooks';
import {
  KeyboardAvoidingView,
  MaterialInput,
  ScrollView,
  Text,
  UsualButton,
  View,
} from '@components';
import styles from './styles';
import {InputPhone, ItemPrice, WayToPayItem} from '..';

//Type
import {TPrice} from '@types';
type TProps = {
  index: number;
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

const InnerPage: React.FC<TProps> = ({index}) => {
  const {t} = useTranslation();
  const [fuelCouner, setFuelAmount] = useState<number | null>(null);
  const [prices, setPrices] = useState<TPrice[]>(mopData);
  const [selectedPriceId, setSelectedPriceId] = useState<number | null>(null);
  const [phoneNumber, setPhone] = useState('');
  const [FullCostOfFuel, setFullCostOfFuel] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };
  const hidenModal = () => {
    setIsVisible(false);
  };

  const PayForFuel = () => {};
  const onSelectedPrice = (id: number) => {
    setSelectedPriceId(id);
  };
  const onChangeFuelAmount = (str: string) => {
    setFuelAmount(+str || null);
  };

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
            )} ${FullCostOfFuel.toFixed(2)}`}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <WayToPayItem onPress={showModal} isVisible={isVisible} />
        </View>
      </ScrollView>
      <UsualButton
        title={t('PayForFuel')}
        disabled={!phoneNumber}
        buttonStyle={styles.usualButton}
        onPress={PayForFuel}
      />
    </KeyboardAvoidingView>
  );
};

export default InnerPage;
