import React from 'react';
import {colors} from '@constants';
import {TouchableOpacity, View, Icon} from '../..';
import {SVG_Icons} from '@assets';

import styles from './styles';
import {ActivityIndicator} from 'react-native';

type TPros = {
  onPress: () => void;
  onClear: (event: any) => void;
  showMyPositionButton: boolean;
  showMyClearButton: boolean;
  loading: boolean;
};

const RightMyButton: React.FC<TPros> = ({
  onPress,
  onClear,
  showMyPositionButton,
  showMyClearButton,
  loading,
}) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={onClear} disabled={!showMyClearButton}>
        <View style={styles.iconView}>
          {showMyClearButton && (
            <Icon size={24} name="x" color={colors.gray_DADBDF} />
          )}
        </View>
      </TouchableOpacity>
      {showMyPositionButton ? (
        !loading ? (
          <TouchableOpacity onPress={onPress}>
            <View style={styles.iconView}>
              <SVG_Icons
                height={25}
                fill={colors.black_000000}
                name="location"
              />
            </View>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size={24} color={colors.green_00AE36} />
        )
      ) : null}
    </View>
  );
};

export default RightMyButton;
