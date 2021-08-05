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
  Switch,
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
        onPress: () => {},
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

  const switchTrackColor = useMemo(() => {
    return {false: colors.gray_8D909D, true: colors.green_00AE36};
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.biometricsContainer}>
        <View>
          <Text style={styles.biometricsTitle}>{t('Вхід за відбитком')}</Text>
          <Text style={styles.biometricsIsActive}>{t('Вимкнено')}</Text>
        </View>
        <Switch
          trackColor={switchTrackColor}
          thumbColor={colors.white_FFFFFF}
          ios_backgroundColor={colors.gray_8D909D}
          onValueChange={toggleBiometricsSwitch}
          value={isBiometricsActive}
        />
      </View>
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
