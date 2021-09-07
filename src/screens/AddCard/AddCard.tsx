import React from 'react';

import {
  useEffect,
  useCallback,
  useTranslation,
  useState,
  useNavigation,
  useRoute,
} from '@hooks';

import {assets} from '@assets';
import {View, Text, UsualButton, CreditCardInput, Keyboard} from '@components';

import {connect} from 'react-redux';
import styles from './styles';

//Type
import {TGlobalState, TCreditCard, AddCardRouteProp} from '@types';
import {Dispatch} from 'redux';
import {colors, height, width} from '@constants';
import {setCreditCards} from '@reducers/creditCards';

type TProps = {
  dispatch: Dispatch;
};

type TStatus = 'valid' | 'incomplete';
type TForm = {
  valid: boolean;
  status: {
    number: TStatus;
    expiry: TStatus;
    cvc: TStatus;
  };
  values: TCreditCard;
};

const AddCard: React.FC<TProps> = ({dispatch}) => {
  const {goBack, navigate} = useNavigation();
  const {params} = useRoute<AddCardRouteProp>();

  const {t} = useTranslation();
  const [isValidForm, setIsValidForm] = useState(false);
  const [newCreditCard, setNewCreditCard] = useState<TCreditCard | null>(null);
  const loading = false;

  const getLabels = useCallback(
    () => ({
      number: t('NumberOfCreditCard'),
      expiry: t('ValidityPeriod'),
      cvc: 'CVC/CVV',
    }),
    [t],
  );

  const getPlaceholders = useCallback(
    () => ({
      number: 'XXXX XXXX XXXX XXXX',
      expiry: t('ValidityPeriod'),
      cvc: 'CVC/CVV',
    }),
    [t],
  );

  const submit = () => {
    dispatch(setCreditCards(newCreditCard as TCreditCard));
    if (params?.openModal) {
      navigate('FuelPurchase', {openModal: true});
    } else {
      goBack();
    }
  };
  const onChange = (x: TForm): void => {
    setIsValidForm(x.valid);
    if (x.valid) {
      setNewCreditCard(x.values);
    } else {
      setNewCreditCard(null);
    }
  };

  useEffect(() => {
    if (isValidForm) {
      Keyboard.dismiss();
    }
  }, [isValidForm]);

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <CreditCardInput
          cardImageBack={assets.CARD_BACK}
          cardImageFront={assets.CARD_FRONT}
          inputStyle={styles.inputText}
          labelStyle={[styles.cardLabel]}
          labels={getLabels()}
          onChange={onChange}
          placeholderColor={colors.gray_8D909D}
          placeholders={getPlaceholders()}
          showCardTop={height / width > 1.8}
          // showCardBottom
        />
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.textDescription}>
          {t('To check the card, UAH 1 will be temporarily blocked on it')}
        </Text>
        <UsualButton
          title={t('Save')}
          loading={loading}
          dark={loading}
          disabled={!isValidForm}
          buttonStyle={styles.usualButton}
          onPress={submit}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  creditCards: state.creditCards,
});

export default connect(mapStateToProps)(AddCard);
