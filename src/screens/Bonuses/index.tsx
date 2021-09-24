import React from 'react';
import {useCallback, useMemo, useTranslation} from '@hooks';
import {
  View,
  Text,
  Image,
  Icon,
  UsualButton,
  TouchableOpacity,
} from '@components';
import {TGlobalState, TProfile} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {assets} from '@assets';
import {declension} from '@constants';
import {navigate} from '@services';

type TProps = {
  profile: TProfile;
};

const Bonuses: React.FC<TProps> = ({profile}) => {
  const {t} = useTranslation();

  const onPressTerms = useCallback(() => {
    navigate('LoyaltyTerms');
  }, []);

  const onPressInviteFriends = useCallback(() => {
    navigate('InviteFriends');
  }, []);

  const bonusesValue = useMemo(() => {
    return profile?.count_bonus ? `${profile.count_bonus} ${t('балів')}` : '';
  }, [profile?.count_bonus]);

  const activeReferrals = useMemo(() => {
    return profile?.count_referral
      ? `${profile.count_referral} ${declension(5, ['особа', 'особи', 'осіб'])}`
      : '';
  }, [profile?.count_referral]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={assets.BONUSES_GIFT} style={styles.headerImage} />
        <Text style={styles.headerBalance}>{t('Баланс бонусів')}</Text>
        <Text style={styles.headerValue}>{bonusesValue}</Text>
      </View>
      <View style={styles.borderBottomView}>
        <Text style={styles.borderBottomViewTitle}>
          {t('Активні реферали')}:
        </Text>
        <Text style={styles.borderBottomViewValue}>{activeReferrals}</Text>
      </View>
      <View style={styles.borderBottomView}>
        <Text style={styles.borderBottomViewTitle}>{t('Використано')}:</Text>
        <Text style={styles.borderBottomViewValue}>{`${
          profile?.count_spent_bonus
        } ${t('балів')}`}</Text>
      </View>
      <TouchableOpacity style={styles.termsContainer} onPress={onPressTerms}>
        <Text style={styles.termsTitle}>{t('Умови програми')}</Text>
        <Icon size={24} name="right" />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <UsualButton
          title={t('Запросити друзів')}
          onPress={onPressInviteFriends}
        />
      </View>
    </View>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
});

export default connect(mapStateToProps)(Bonuses);
