import React from 'react';
import {Dispatch} from 'redux';
import {
  useEffect,
  useCallback,
  useMemo,
  useTranslation,
  useState,
} from '@hooks';
import {View, Text, SwitchCustom} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';

type TProps = {
  dispatch: Dispatch;
};

const NotificationSettings: React.FC<TProps> = ({dispatch}) => {
  const {t} = useTranslation();
  const [isPromoActive, setIsPromoActive] = useState<boolean>(false);
  const [isPartnerActive, setIsPartnerActive] = useState<boolean>(false);
  const [isMessagesActive, setIsMessagesActive] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <SwitchCustom
        value={isPromoActive}
        onValueChange={setIsPromoActive}
        title={t('Акційні пропозиції')}
      />
      <SwitchCustom
        value={isPartnerActive}
        onValueChange={setIsPartnerActive}
        title={t('Про партнерську програму')}
      />
      <SwitchCustom
        value={isMessagesActive}
        onValueChange={setIsMessagesActive}
        title={t('Повідомлення від розробників')}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  // reducer: state.reducer
});

export default connect(mapStateToProps)(NotificationSettings);
