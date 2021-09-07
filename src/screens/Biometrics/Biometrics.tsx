import React from 'react';
import {Dispatch} from 'redux';
import {
  useEffect,
  useCallback,
  useMemo,
  useTranslation,
  useNavigation,
} from '@hooks';
import {
  View,
  Text,
  QuestionButton,
  UsualButton,
  GhostButton,
  Image,
  DeviceInfo,
  ReactNativeBiometrics,
} from '@components';
import {TGlobalState, TBiometricsType} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {assets} from '@assets';
import {setIsUserAuthorized, setLoader} from '@reducers/appGlobalState';
import {httpPost, errorHandler} from '@services';
import {urls} from '@constants';
import {setFaceIdActiveLocal, setUserKey} from '@reducers/biometrics';
import {getProfile} from '@reducers/profile';

type TProps = {
  dispatch: Dispatch;
  biometricsType: TBiometricsType;
};

const Biometrics: React.FC<TProps> = ({dispatch, biometricsType}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  const device_id = DeviceInfo.getUniqueId();

  useEffect(() => {
    setOptions({
      headerRight: () => <QuestionButton />,
    });
  }, []);

  const createKeys = async () => {
    dispatch(setLoader(true));
    try {
      const res = await ReactNativeBiometrics.createKeys();
      const body = await httpPost(urls.biometricsAdd, {
        public_key: res.publicKey,
        device_id,
      });
      dispatch(setLoader(false));
      if (body.data.data.user_key) {
        dispatch(setIsUserAuthorized(true));
        dispatch(setFaceIdActiveLocal(true));
        dispatch(setUserKey(body.data.data.user_key));
        dispatch(getProfile());
      }
    } catch (e) {
      dispatch(setLoader(false));
      errorHandler('createKeys error biometrics reg');
    }
  };

  const onPressTurnOnBio = useCallback(() => {
    createKeys();
  }, []);

  const onPressSkip = useCallback(() => {
    dispatch(setIsUserAuthorized(true));
  }, []);

  const biometricsTypeData = useMemo(() => {
    if (biometricsType === 'fingerprint') {
      return {
        title: t(
          'Ви хочете використовувати відбиток пальця для входу в додаток Marshal?',
        ),
        image: assets.BIO_TOUCH,
        button: t('Увімкнути вхід за відбитком'),
      };
    }
    if (biometricsType === 'touchId') {
      return {
        title: t(
          'Ви хочете використовувати Touch ID для входу в додаток Marshal?',
        ),
        image: assets.BIO_TOUCH,
        button: t('Увімкнути вхід з Touch ID'),
      };
    }
    return {
      title: t(
        'Ви хочете використовувати Face ID для входу в додаток Marshal?',
      ),
      image: assets.BIO_FACE,
      button: t('Увімкнути вхід з Face ID'),
    };
  }, [biometricsType]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{biometricsTypeData.title}</Text>
      <Image source={biometricsTypeData.image} style={styles.image} />
      <View>
        <View style={styles.buttonContainer}>
          <UsualButton
            title={biometricsTypeData.button}
            onPress={onPressTurnOnBio}
          />
        </View>
        <GhostButton title={t('Пропустити')} onPress={onPressSkip} />
      </View>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  biometricsType: state.biometrics.biometricsType,
});

export default connect(mapStateToProps)(Biometrics);
