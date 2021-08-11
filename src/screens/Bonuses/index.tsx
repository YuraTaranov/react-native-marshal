import React from 'react';
import {
  useEffect,
  useCallback,
  useMemo,
  useTranslation,
  useState,
} from '@hooks';
import {
  View,
  Text,
  Image,
  Icon,
  UsualButton,
  TouchableOpacity,
} from '@components';
import {TGlobalState, TReferrals} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {assets} from '@assets';
import {declension} from '@constants';
import {navigate} from '@services';

const fakeData = {
  activeReferrals: 5,
  bonusesUsed: 50,
  bonuses: 250,
};

type TProps = {
  referrals: TReferrals;
};

const Bonuses: React.FC<TProps> = ({referrals}) => {
  const {t} = useTranslation();

  const onPressInvite = useCallback(() => {}, []);

  const onPressTerms = useCallback(() => {
    navigate('LoyaltyTerms');
  }, []);

  const bonusesValue = useMemo(() => {
    return `${fakeData.bonuses} балів`;
  }, []);

  const activeReferrals = useMemo(() => {
    return `${fakeData.activeReferrals} ${declension(fakeData.activeReferrals, [
      'особа',
      'особи',
      'осіб',
    ])}`;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={assets.BONUSES_GIFT} style={styles.headerImage} />
        <Text style={styles.headerBalance}>{t('Баланс бонусів')}</Text>
        <Text style={styles.headerValue}>{bonusesValue}</Text>
      </View>
      <View style={styles.borderBottomView}>
        <Text style={styles.borderBottomViewTitle}>
          {t('Активні реферали:')}
        </Text>
        <Text style={styles.borderBottomViewValue}>{activeReferrals}</Text>
      </View>
      <View style={styles.borderBottomView}>
        <Text style={styles.borderBottomViewTitle}>{t('Використано:')}</Text>
        <Text style={styles.borderBottomViewValue}>{`${
          fakeData.bonusesUsed
        } ${t('балів')}`}</Text>
      </View>
      <TouchableOpacity style={styles.termsContainer} onPress={onPressTerms}>
        <Text style={styles.termsTitle}>{t('Умови програми')}</Text>
        <Icon size={24} name="right" />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <UsualButton title={t('Запросити друзів')} onPress={onPressInvite} />
      </View>
    </View>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  //   referrals: state.referrals.data,
});

export default connect(mapStateToProps)(Bonuses);
