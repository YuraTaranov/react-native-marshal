import React from 'react';
import {useCallback, useTranslation, useState} from '@hooks';
import {DeviceInfo, SwitchCustom, ReactNativeBiometrics} from '@components';
import {connect} from 'react-redux';
import {setLoader} from '@reducers/appGlobalState';
import {httpPost, errorHandler} from '@services';
import {urls} from '@constants';
import {setFaceIdActiveLocal, setUserKey} from '@reducers/biometrics';
import {getProfile} from '@reducers/profile';
import {TGlobalState, TProfile} from '@types';
import {Dispatch} from 'redux';
import {setBioTurnOffAfterLogout} from '@reducers/logout';

type TProps = {
  dispatch: Dispatch;
  profile: TProfile;
};

const BioAuthSwitch: React.FC<TProps> = ({dispatch, profile}) => {
  const {t} = useTranslation();
  const [isBiometricsActive, setIsBiometricsActive] = useState<boolean>(
    !!Number(profile?.setting_bio_auth),
  );
  const device_id = DeviceInfo.getUniqueId();

  const createKeys = useCallback(async () => {
    try {
      const res = await ReactNativeBiometrics.createKeys();
      const body = await httpPost(urls.biometricsAdd, {
        public_key: res.publicKey,
        device_id,
      });
      dispatch(setLoader(false));
      if (body.data.data.user_key) {
        dispatch(setFaceIdActiveLocal(true));
        dispatch(setBioTurnOffAfterLogout(false));
        dispatch(setUserKey(body.data.data.user_key));
        dispatch(getProfile());
      }
    } catch (e) {
      dispatch(setLoader(false));
      setIsBiometricsActive(false);
      errorHandler(e, 'createKeys error biometrics reg');
    }
  }, [device_id]);

  const deleteKeys = useCallback(async () => {
    const res = await ReactNativeBiometrics.deleteKeys();
    dispatch(setLoader(false));
    dispatch(setFaceIdActiveLocal(false));
    dispatch(getProfile());
  }, []);

  const toggleBiometricsSwitch = useCallback(async value => {
    dispatch(setLoader(true));
    setIsBiometricsActive(value);
    try {
      const body = await httpPost(urls.profileUpdate, {
        setting_bio_auth: Number(value),
      });
      if (body.status === 200) {
        value ? createKeys() : deleteKeys();
      }
    } catch (error) {
      dispatch(setLoader(false));
      setIsBiometricsActive(false);
      errorHandler(error, 'toggleBiometricsSwitch');
    }
  }, []);

  return (
    <SwitchCustom
      value={isBiometricsActive}
      onValueChange={toggleBiometricsSwitch}
      title={t('Вхід за відбитком')}
    />
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  profile: state.profile.data,
});

export default connect(mapStateToProps)(BioAuthSwitch);
