import React from 'react'
import { useCallback, useMemo } from '@hooks'
import { View, Text, TouchableOpacity, Modal } from '@components'
import styles from './styles'
import { connect } from 'react-redux'
import { TGlobalState } from '@types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useHeaderHeight } from '@react-navigation/stack'
import { Dispatch } from 'redux'
import { setSupport } from '@reducers/modalController'

type TProps = {
  support: TGlobalState['modalController']['support'],
  dispatch: Dispatch
}

const Support: React.FC<TProps> = ({ support, dispatch }) => {

  const onSwipeCancel = () => {
    dispatch(setSupport(false))
  }

  return (
    <Modal swipeDirection={['down', 'up']} propagateSwipe={true} onSwipeCancel={onSwipeCancel} isVisible={support} style={{ flex: 1, margin: 0 }}>
      <SafeAreaView style={{ backgroundColor: 'green', flex: 0 }} >
      </SafeAreaView>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
        <View>

        </View>
      </SafeAreaView>
    </Modal>
  )
}

const mapStateToProps = (state: TGlobalState) => ({
  support: state.modalController.support
})

export default connect(mapStateToProps)(Support);

