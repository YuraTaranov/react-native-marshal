import React from 'react'
import { useEffect, useCallback, useMemo, useTranslation, useState } from '@hooks'
import { View, Text } from '@components'
import { TGlobalState } from '@types'
import {connect} from 'react-redux';
import styles from './styles';
type TProps = {

}

const Bonuses: React.FC<TProps> = ({}) => {
	const { t } = useTranslation()
	return (
	<View style={styles.container}>
		<Text>
			BonusesScreen
		</Text>
	</View>
	)
}
const mapStateToProps = (state: TGlobalState) => ({

});

export default connect(mapStateToProps)(Bonuses);