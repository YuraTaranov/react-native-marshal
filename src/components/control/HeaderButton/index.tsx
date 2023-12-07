import React from 'react';
import {Icon, Pressable} from '@components';

type TProps = {
  name: 'question-circle' | 'Union' | 'left';
  size: number;
  color?: string;
  onPress?: () => void;
};

const HeaderButton: React.FC<TProps> = ({name, size, color, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </Pressable>
  );
};

export default HeaderButton;
