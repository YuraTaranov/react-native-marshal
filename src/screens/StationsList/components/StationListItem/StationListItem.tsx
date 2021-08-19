import React from 'react';
import {useCallback, useMemo, useTranslation, useState} from '@hooks';
import {View, Text, Icon, TouchableHighlight} from '@components';
import {SVG_Icons} from '@assets';
import styles from './styles';
import {colors} from '@constants';
import {TPetrolStation} from '@types';

type TProps = {
  item: TPetrolStation;
  selected?: boolean;
  onShowDetails: (id: number) => void;
  getRoute: (id: number) => void;
};

export const StationListItem: React.FC<TProps> = ({
  item,
  selected,
  onShowDetails,
  getRoute,
}) => {
  const {t} = useTranslation();
  return (
    <TouchableHighlight
      activeOpacity={0.4}
      underlayColor={colors.gray_DADBDF}
      onPress={() => onShowDetails(item.id)}>
      <View style={styles.container}>
        <View style={styles.leftIconView}>
          <View style={styles.leftIcon}>
            <SVG_Icons
              height={36}
              fill={selected ? colors.green_41BB4E : colors.red_F10000}
            />
          </View>
        </View>

        <View style={styles.blockText}>
          <View style={styles.blockTitle}>
            <Text style={styles.textTitle}>{item.name}</Text>
          </View>
          <View style={styles.blockAddress}>
            <Text style={styles.textAddress}>{item.address}</Text>
          </View>
        </View>
        <TouchableHighlight
          activeOpacity={0.6}
          style={styles.touch}
          underlayColor={colors.gray_DADBDF}
          onPress={() => getRoute(item.id)}>
          <View style={styles.rightIconView}>
            <View style={styles.iconView}>
              <Icon
                name="route"
                color={!selected ? colors.green_41BB4E : colors.red_F10000}
                size={18}
              />
            </View>
            <View style={styles.iconTextView}>
              <Text style={styles.iconText}>{`${t('Route')}`}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
};
