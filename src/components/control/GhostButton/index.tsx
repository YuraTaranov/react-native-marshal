import React from 'react'
import { useCallback, useMemo, useTranslation } from '@hooks'
import { TouchableOpacity, Text, ActivityIndicator, View } from '@components'
import styles from './styles'
import { colors } from '@constants'

type TProps = {
  title: string,
  loading: boolean,
  disabled?: boolean,
  onPress: () => void,
  timer?: number,
  buttonStyle?: {},
  titleStyle?: {},
}

const GhostButton: React.FC<TProps> = ({ title, loading = false, disabled = false, onPress, timer, buttonStyle, titleStyle }) => {
  const { t } = useTranslation()

  const btnStyle = useMemo(() => [styles.container, (loading || disabled) && { borderColor: colors.gray_DADBDF }], [loading, disabled])
  const textStyle = useMemo(() => [styles.title, (loading || disabled) && { color: colors.gray_8D909D }], [loading, disabled])

  return (
    <TouchableOpacity style={[btnStyle, buttonStyle]} disabled={disabled || loading} onPress={onPress}>
      <View style={styles.contentContainer}>
        {
          loading ? <ActivityIndicator color={colors.black_000000} size={14} /> :
            <>
              <Text style={[textStyle, titleStyle]}>{t(title)}</Text>
              {timer && timer > 0 ? <Text style={styles.title}>{` (${timer} c)`}</Text> : null}
            </>
        }
      </View>
    </TouchableOpacity>
  )
}

export default GhostButton;

