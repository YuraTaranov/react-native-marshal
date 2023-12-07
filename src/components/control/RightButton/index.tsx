import React from 'react';
import {Text, TouchableOpacity} from '@components';
import styles from './styles';

type TProps = {
  onPress: () => void;
  color?: string;
  title: string;
};

export const RightButton: React.FC<TProps> = ({onPress, title, color}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={[styles.title, !!color && {color}]}>{title}</Text>
  </TouchableOpacity>
);
