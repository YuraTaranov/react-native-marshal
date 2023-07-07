import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {useCallback, useMemo, useNavigation, useState, useEffect} from '@hooks';
import {View, ScrollView, RefreshControl, QuestionButton} from '@components';
import {colors} from '@constants';
import {navigate} from '@services';
import {getProfile} from '@reducers/profile';

import styles from './styles';
import {BonusCard, BonusInfoBlock, InviteButton} from './components';
//types
import {TGlobalState, TProfile} from '@types';

type TProps = {
  dispatch: Dispatch;
  profile: TProfile;
};

const Bonuses: React.FC<TProps> = ({dispatch, profile}) => {
  const [refreshing, setRefreshing] = useState(false);

  const {count_bonus, count_spent_bonus} = profile;
  const {setOptions} = useNavigation();

  useEffect(() => {
    setOptions({
      headerLeft: () => <QuestionButton />,
    });
  }, []);

  // const onPressTerms = useCallback(() => {
  //   navigate('BonusesStack', {
  //     screen: 'LoyaltyTerms',
  //   });
  // }, []);

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

  // const activeReferrals = useMemo(() => {
  //   return profile?.count_referral
  //     ? `${profile.count_referral} ${declension(profile.count_referral, [
  //         t('особа'),
  //         t('особи'),
  //         t('осіб'),
  //       ])}`
  //     : '';
  // }, [profile?.count_referral, t]);

  return (
    <View style={styles.container}>
      <BonusCard count_bonus={count_bonus} />
      <ScrollView refreshControl={refreshControl}>
        <BonusInfoBlock
          count_bonus={count_bonus}
          count_spent_bonus={count_spent_bonus}
        />
        <InviteButton onPressHandler={onPressInviteFriends} />
        {/* <TouchableOpacity style={styles.termsContainer} onPress={onPressTerms}>
          <Text style={styles.termsTitle}>{t('Умови програми')}</Text>
          <Icon size={24} name="right" />
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
});

export default connect(mapStateToProps)(Bonuses);
