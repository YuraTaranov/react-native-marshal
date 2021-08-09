import React from 'react';
import {useMemo, useTranslation} from '@hooks';
import {View, Text, Switch} from '@components';
import styles from './styles';
import {colors} from '@constants';

type TProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  title: string;
};

const SwitchCustom: React.FC<TProps> = ({value, onValueChange, title}) => {
  const {t} = useTranslation();

  const switchTrackColor = useMemo(() => {
    return {false: colors.gray_8D909D, true: colors.green_00AE36};
  }, []);

  const isActiveText = useMemo(() => {
    return value ? t('Увімкнено') : t('Вимкнено');
  }, [value]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.isActive}>{isActiveText}</Text>
      </View>
      <Switch
        trackColor={switchTrackColor}
        thumbColor={colors.white_FFFFFF}
        ios_backgroundColor={colors.gray_8D909D}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default SwitchCustom;
