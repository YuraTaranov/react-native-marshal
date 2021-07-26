import React from 'react'
import { useCallback, useMemo } from '@hooks'
import { View, Text, TouchableOpacity } from '@components'
import styles from './styles'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setSupport } from '@reducers/modalController'

type TProps = {
  dispatch: Dispatch,
}

const QuestionButton: React.FC<TProps> = ({ dispatch }) => {

  return (
    <TouchableOpacity onPress={() => dispatch(setSupport(true))} style={styles.container}>
      <Text style={styles.text}>?</Text>
    </TouchableOpacity>
  )
}

export default connect()(QuestionButton);

