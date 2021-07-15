import React from 'react'
import { useEffect, useCallback, useMemo, useTranslation, useState } from '@hooks'
import { View, Text, TouchableOpacity } from '@components'
import { TGlobalState } from '@types'
import { connect } from 'react-redux';
import styles from './styles';
import { Dispatch } from 'redux';
import { changeLang, setLang, setToken } from '@reducers/appGlobalState';
type TProps = {
	dispatch: Dispatch
}

const Login: React.FC<TProps> = ({ dispatch }) => {
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => dispatch(setToken('new Token'))}>
				<Text>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => dispatch(changeLang('ru'))}>
				<Text>Ru</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => dispatch(changeLang('en'))}>
				<Text>En</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => dispatch(changeLang('ua'))}>
				<Text>Ua</Text>
			</TouchableOpacity>

			<Text>
				LoginScreen
			</Text>
		</View>
	)
}
const mapStateToProps = (state: TGlobalState) => ({

});

export default connect(mapStateToProps)(Login);