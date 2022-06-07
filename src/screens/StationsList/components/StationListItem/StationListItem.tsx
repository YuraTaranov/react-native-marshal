import React from 'react';
import {useCallback, useTranslation} from '@hooks';
import {View, Text, Icon, TouchableOpacity, Image} from '@components';
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
  getRoute,
  item,
  onShowDetails,
  selected,
}) => {
  const {t} = useTranslation();

  const onPressItem = useCallback(() => {
    onShowDetails(item.id);
  }, [item.id]);

  const onPressRoute = useCallback(() => {
    getRoute(item.id);
  }, [item.id]);

  return (
    <TouchableOpacity onPress={onPressItem}>
      <View style={styles.container}>
        <View style={styles.leftIconView}>
          <View style={styles.leftIcon}>
            {/* <SVG_Icons
              height={36}
              fill={selected ? colors.green_41BB4E : colors.red_F10000}
            /> */}
            <Image source={{uri: item.image}} style={styles.stationImage} />
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
        <TouchableOpacity style={styles.touch} onPress={onPressRoute}>
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
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
