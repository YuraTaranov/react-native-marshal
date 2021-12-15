/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {useTranslation, useNavigation, useState, useEffect} from '@hooks';

import {View, Text, UsualButton, CardItem, SwipeListView} from '@components';
import {HiddenItem} from './components';
import {SVG_Img} from '@assets';
import {FondyService} from '@httpServices';

import {connect} from 'react-redux';
import {sizes} from '@constants';
import styles from './styles';

//Type
import {TGlobalState, TPaymentСard, TPaymentСards} from '@types';
import {Dispatch} from 'redux';
import {
  getCreditCards,
  setSelectedCreditCards,
  unSelectAllCreditCards,
} from '@reducers/creditCards';
import {animation} from '@helpers';

type TProps = {
  dispatch: Dispatch;
  creditCardList: TPaymentСards;
};

const MyCards: React.FC<TProps> = ({dispatch, creditCardList}) => {
  const {navigate} = useNavigation();
  const {t} = useTranslation();
  const loading = false;
  const [creditCards, setCreditCards] = useState(creditCardList);

  useEffect(() => {
    dispatch(getCreditCards());
  }, []);

  useEffect(() => {
    setCreditCards(creditCardList);
  }, [creditCardList]);

  const submit = () => {
    navigate('ProfileStack', {
      screen: 'PayForm',
      params: {
        verificationCard: true,
        liters: '',
        fuel_id: '',
      },
    });
  };

  const onSelected =
    (id: number, selected: boolean = false) =>
    (): void => {
      if (!selected) {
        dispatch(setSelectedCreditCards(id));
      } else {
        dispatch(unSelectAllCreditCards());
      }
    };

  const renderCardItem = ({item}: {item: TPaymentСard}) => (
    <CardItem
      cardData={item}
      key={item.id}
      onSelected={onSelected(item.id, item?.selected)}
    />
  );

  const renderHiddenItem = () => <HiddenItem />;

  const onSwipeValueChange = ({key, value}: {key: string; value: number}) => {
    if (creditCards.filter(i => `${i.id}` === `${key}`).length < 1) {
      return;
    }
    const limit = (sizes.window_width / 3) * 2;
    if (value + limit < 0) {
      dispatch(getCreditCards());
      FondyService.deletePaymentСardById(key);
      const newList = creditCards.filter(i => `${i.id}` !== `${key}`);
      setCreditCards(newList);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        {!creditCards.length ? (
          <View style={styles.noCard}>
            <SVG_Img height={260} name="addCard" />
            <Text style={styles.titletext}>
              {t('You_have_not_added_any_cards_yet')}
            </Text>
            <Text style={styles.discriptText}>
              {t('add_card_to_sreen_text')}
            </Text>
          </View>
        ) : (
          <SwipeListView
            disableRightSwipe
            data={creditCards}
            renderItem={renderCardItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-sizes.window_width}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onSwipeValueChange={onSwipeValueChange}
            useNativeDriver={false}
            keyExtractor={item => `${item.id}`}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <UsualButton
          title={t('Add_Card')}
          loading={loading}
          dark={loading}
          buttonStyle={styles.usualButton}
          onPress={submit}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  creditCardList: state.creditCards,
});

export default connect(mapStateToProps)(MyCards);
