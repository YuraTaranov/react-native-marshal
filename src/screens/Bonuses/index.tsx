import React from 'react';
import {useCallback, useMemo, useTranslation, useState} from '@hooks';
import {
  View,
  Text,
  Image,
  Icon,
  UsualButton,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from '@components';
import {TGlobalState, TProfile} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {assets} from '@assets';
import {colors, declension} from '@constants';
import {navigate} from '@services';
import {getProfile} from '@reducers/profile';
import {Dispatch} from 'redux';

type TProps = {
  dispatch: Dispatch;
  profile: TProfile;
};

const Bonuses: React.FC<TProps> = ({dispatch, profile}) => {
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);

  const onPressTerms = useCallback(() => {
    navigate('BonusesStack', {
      screen: 'LoyaltyTerms',
    });
  }, []);

  const onPressInviteFriends = useCallback(() => {
    navigate('BonusesStack', {
      screen: 'InviteFriends',
    });
  }, []);

  const refresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getProfile());
    setRefreshing(false);
  }, []);

  const refreshControl = useMemo(() => {
    return (
      <RefreshControl
        onRefresh={refresh}
        refreshing={refreshing}
        colors={[colors.green_27A74C]}
        tintColor={colors.green_27A74C}
        size={24}
      />
    );
  }, [refreshing]);

  const bonusesValue = useMemo(() => {
    return profile?.count_bonus ? `${profile.count_bonus} ${t('балів')}` : '';
  }, [profile?.count_bonus, t]);

  const activeReferrals = useMemo(() => {
    return profile?.count_referral
      ? `${profile.count_referral} ${declension(profile.count_referral, [
          t('особа'),
          t('особи'),
          t('осіб'),
        ])}`
      : '';
  }, [profile?.count_referral, t]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={assets.BONUSES_GIFT} style={styles.headerImage} />
        <Text style={styles.headerBalance}>{t('Баланс бонусів')}</Text>
        <Text style={styles.headerValue}>{bonusesValue}</Text>
      </View>
      <ScrollView refreshControl={refreshControl}>
        <View style={styles.borderBottomView}>
          <Text style={styles.borderBottomViewTitle}>
            {t('Активні реферали')}:
          </Text>
          <Text style={styles.borderBottomViewValue}>
            {activeReferrals || 0}
          </Text>
        </View>
        <View style={styles.borderBottomView}>
          <Text style={styles.borderBottomViewTitle}>{t('Використано')}:</Text>
          <Text style={styles.borderBottomViewValue}>{`${
            profile?.count_spent_bonus || 0
          } ${t('балів')}`}</Text>
        </View>
        {/* <TouchableOpacity style={styles.termsContainer} onPress={onPressTerms}>
          <Text style={styles.termsTitle}>{t('Умови програми')}</Text>
          <Icon size={24} name="right" />
        </TouchableOpacity> */}
      </ScrollView>
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
