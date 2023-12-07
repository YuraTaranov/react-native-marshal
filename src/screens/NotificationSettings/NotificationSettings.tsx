import React from 'react';
import {Dispatch} from 'redux';
import {useCallback, useTranslation, useState} from '@hooks';
import {View, SwitchCustom} from '@components';
import {TGlobalState, TProfile} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {setLoader} from '@reducers/appGlobalState';
import {errorHandler, httpPost} from '@services';
import {getProfile} from '@reducers/profile';
import {urls} from '@constants';

type TProps = {
  dispatch: Dispatch;
  profile: TProfile;
};

const NotificationSettings: React.FC<TProps> = ({dispatch, profile}) => {
  const {t} = useTranslation();
  const [isPromoActive, setIsPromoActive] = useState<boolean>(
    profile?.setting_notification,
  );
  const [isPartnerActive, setIsPartnerActive] = useState<boolean>(
    profile?.setting_affiliate_program,
  );
  const [isMessagesActive, setIsMessagesActive] = useState<boolean>(
    profile?.setting_message_dev,
  );

  const updateProfile = useCallback(async data => {
    dispatch(setLoader(true));
    try {
      const body = await httpPost(urls.profileUpdate, data);
      dispatch(setLoader(false));
      if (body.status === 200) {
        dispatch(getProfile());
      }
    } catch (error) {
      dispatch(setLoader(false));
      errorHandler(error, 'updateProfile notifications settings');
    }
  }, []);

  const togglePromo = useCallback(value => {
    setIsPromoActive(value);
    updateProfile({
      setting_notification: value,
    });
  }, []);

  // const togglePartner = useCallback(value => {
  //   setIsPartnerActive(value);
  //   updateProfile({
  //     setting_affiliate_program: value,
  //   });
  // }, []);

  // const toggleMessages = useCallback(value => {
  //   setIsMessagesActive(value);
  //   updateProfile({
  //     setting_message_dev: value,
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <SwitchCustom
        value={isPromoActive}
        onValueChange={togglePromo}
        title={t('Акційні пропозиції')}
      />
      {/* <SwitchCustom
        value={isPartnerActive}
        onValueChange={togglePartner}
        title={t('Про партнерську програму')}
      />
      <SwitchCustom
        value={isMessagesActive}
        onValueChange={toggleMessages}
        title={t('Повідомлення від розробників')}
      /> */}
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
});

export default connect(mapStateToProps)(NotificationSettings);
