import React from 'react';
import {Dispatch} from 'redux';
import {useCallback, useTranslation, useState} from '@hooks';
import {View, SwitchCustom} from '@components';
import {TGlobalState, TProfile} from '@types';
import styles from './styles';
import {setLoader} from '@reducers/appGlobalState';
import {errorHandler, httpPost} from '@services';
import {getProfile} from '@reducers/profile';
import {urls} from '@constants';
import {connect} from 'react-redux';

type TProps = {
  dispatch: Dispatch;
  profile: TProfile;
};

const NotificationSwitch: React.FC<TProps> = ({dispatch, profile}) => {
  const {t} = useTranslation();
  const [isPromoActive, setIsPromoActive] = useState<boolean>(
    profile?.setting_notification,
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

  return (
    <SwitchCustom
      value={isPromoActive}
      onValueChange={togglePromo}
      title={t('Сповіщення')}
    />
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
});

export default connect(mapStateToProps)(NotificationSwitch);
