/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {useTranslation, useNavigation} from '@hooks';

import {View, Text, UsualButton, CardItem, ScrollView} from '@components';
import {SVG_Img} from '@assets';

import {connect} from 'react-redux';
import styles from './styles';

//Type
import {TGlobalState, TCreditCard} from '@types';
import {Dispatch} from 'redux';
import {setSelectedCreditCards} from '@reducers/creditCards';

type TProps = {
  dispatch: Dispatch;
  creditCards: TCreditCard[];
};

const MyCards: React.FC<TProps> = ({dispatch, creditCards}) => {
  const {navigate} = useNavigation();
  const {t} = useTranslation();
  const loading = false;

  const submit = () => {
    navigate('AddCard');
  };

  const onSelected = (num: string) => (): void => {
    dispatch(setSelectedCreditCards(num));
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
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps
            bounces>
            {creditCards.map(item => (
              <CardItem
                cardData={item}
                key={item.number}
                onSelected={onSelected(item.number)}
              />
            ))}
          </ScrollView>
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
  creditCards: state.creditCards,
});

export default connect(mapStateToProps)(MyCards);
