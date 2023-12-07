import React from 'react';
import {useCallback, useTranslation} from '@hooks';
import {
  View,
  Text,
  InviteFriendsInfo,
  Image,
  UsualButton,
  ScrollView,
} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {assets} from '@assets';
import {setBonusesOnBoarding} from '@reducers/appGlobalState';
import {Dispatch} from 'redux';

type TProps = {
  dispatch: Dispatch;
};

const BonusesOnBoarding: React.FC<TProps> = ({dispatch}) => {
  const {t} = useTranslation();

  const onPress = useCallback(() => {
    dispatch(setBonusesOnBoarding(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={assets.BONUSES_ONBOARDING} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {t('Запрошуйте друзів – платіть менше!')}
          </Text>
          <InviteFriendsInfo />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <UsualButton title={t('button.title.continue')} onPress={onPress} />
      </View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(BonusesOnBoarding);
