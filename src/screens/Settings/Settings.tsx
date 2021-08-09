import React from 'react';
import {Dispatch} from 'redux';
import {
  useEffect,
  useCallback,
  useMemo,
  useTranslation,
  useState,
  useNavigation,
} from '@hooks';
import {
  View,
  Text,
  TouchableOpacity,
  Icon,
  FlatList,
  OpenAppSettings,
  SwitchCustom,
} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '@constants';
import {navigate} from '@services';
import {logout} from '@reducers/logout';

type TProps = {
  dispatch: Dispatch;
};

type TMenuItem = {
  name: string;
  onPress: () => void;
};

const Settings: React.FC<TProps> = ({dispatch}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  const [isBiometricsActive, setIsBiometricsActive] = useState<boolean>(false);

  const onPressLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  const toggleBiometricsSwitch = useCallback(() => {
    setIsBiometricsActive(!isBiometricsActive);
  }, [isBiometricsActive]);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPressLogout}>
          <Icon size={24} name="logout" color={colors.white_FFFFFF} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const menuItems: TMenuItem[] = useMemo(() => {
    return [
      {
        name: t('Геопозиція'),
        onPress: () => OpenAppSettings.open(),
      },
      {
        name: t('Сповіщення'),
        onPress: () => navigate('NotificationSettings'),
      },
      {
        name: t('Про додаток'),
        onPress: () => navigate('AboutApp'),
      },
      {
        name: t('Умови лояльності'),
        onPress: () => navigate('LoyaltyTerms'),
      },
      {
        name: t('Умови використання'),
        onPress: () => navigate('UseTerms'),
      },
    ];
  }, []);

  const renderItem: ({item}: {item: TMenuItem}) => JSX.Element = useCallback(
    ({item}) => (
      <TouchableOpacity style={styles.itemContainer} onPress={item.onPress}>
        <Text style={styles.name}>{item.name}</Text>
        <Icon name="right" color={colors.black_1E1A1A} size={24} />
      </TouchableOpacity>
    ),
    [],
  );
  const keyExtractor: (item: TMenuItem) => string = useCallback(
    item => String(item.name),
    [],
  );

  return (
    <View style={styles.container}>
      <SwitchCustom
        value={isBiometricsActive}
        onValueChange={toggleBiometricsSwitch}
        title={t('Вхід за відбитком')}
      />
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(Settings);
