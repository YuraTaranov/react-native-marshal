import React from 'react'
import { useEffect, useCallback, useMemo, useTranslation, useState } from '@hooks'
import { View, Text, TouchableOpacity } from '@components'
import { TGlobalState } from '@types'
import { connect } from 'react-redux';
import styles from './styles';
import { Dispatch } from 'redux';
import { resetAppGlobalState } from '@reducers/appGlobalState';
type TProps = {
	dispatch: Dispatch
}

const Home: React.FC<TProps> = ({dispatch }) => {
	const { t } = useTranslation()
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => dispatch(resetAppGlobalState())}>
				<Text>Logout</Text>
			</TouchableOpacity>
			
			<Text>
				HomeScreen
			</Text>
		</View>
	)
}
const mapStateToProps = (state: TGlobalState) => ({

});

export default connect(mapStateToProps)(Home);