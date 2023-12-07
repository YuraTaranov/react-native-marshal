import React from 'react';
import {useState} from '@hooks';
import {View, Text, TouchableOpacity, Icon} from '@components';
import {colors} from '@constants';
import styles from './styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TStatus} from '@types';

type TProps = {
  label: string;
  status: TStatus;
  onPress: () => void;
};

export const ListItem: React.FC<TProps> = ({label, status, onPress}) => {
  const isSelected = status === 'selected';
  const None = status === 'none';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={None}>
      <View style={styles.textView}>
        <Text
          style={[
            styles.labelText,
            isSelected && !None && styles.selectedLabelText,
          ]}>{`${label}`}</Text>
      </View>
      {!None && (
        <View style={styles.iconView}>
          <Icon
            name="check_active"
            color={isSelected ? colors.green_41BB4E : colors.gray_DADBDF}
            size={22}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
