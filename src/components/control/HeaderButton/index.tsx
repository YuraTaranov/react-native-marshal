import React from 'react'
import { useCallback, useMemo } from '@hooks'
import { View, TouchableOpacity, Icon } from '@components'
import styles from './styles'

type TProps = {
  name: 'question-circle' | 'Union',
  size: number,
  color?: string,
  onPress?: () => void
}

const HeaderButton: React.FC<TProps> = ({ name, size, color, onPress }) => {
  return (<TouchableOpacity onPress={onPress}>
    <Icon name={name} size={size} color={color} />
  </TouchableOpacity>
  )
}

export default HeaderButton;

